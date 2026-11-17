/*
 * Content Security Policy (CSP) violation reports
 * ===============================================
 *
 * When a browser blocks something because of the CSP (or would block it, for the report-only Trusted Types
 * rules), it posts a short report here. This writes one line per report to Netlify's edge function logs
 * (Netlify UI: Logs > Edge Functions), so problems show up instead of failing silently.
 * The policy itself is built in `lib/utils/headers/contentSecurityPolicy.js`.
 *
 * Browsers send reports in two formats:
 * - `application/reports+json`: the Reporting API (`report-to`), a list of reports
 * - `application/csp-report`: the older `report-uri` format, one report
 *
 * Privacy: only what helps fix a problem is logged (the page path, what was blocked, which rule blocked it and
 * a short code sample). No IP address or browser details, and query strings are removed from addresses.
 * Anything else is ignored, and every reply is an empty 204, so the endpoint gives nothing away.
 */

// Reports are small. Anything bigger isn't a real report, so it isn't read.
const maxBodySize = 64 * 1024;
const maxReportsLogged = 20; // per request; the Reporting API can batch several together

/**
 * Shortens an address to its origin and path, without the query string or `#fragment`.
 * Values that aren't addresses (eg. `inline`, `eval`, `trusted-types-sink`) are returned as they are.
 */
function trimUrl(value) {
  if (!value) {
    return '';
  }

  try {
    const url = new URL(value);
    return `${url.origin}${url.pathname}`;
  } catch {
    return String(value).slice(0, 100);
  }
}

/**
 * Just the path of the page the report came from (eg. `/about`)
 */
function pagePath(value) {
  try {
    return new URL(value).pathname;
  } catch {
    return '(unknown page)';
  }
}

/**
 * Turns either report format into the same few fields
 */
function summarise(report) {
  // Reporting API (`report-to`): `{ type: 'csp-violation', body: { documentURL, effectiveDirective, ... } }`
  if (report?.type === 'csp-violation' && report.body) {
    const { documentURL, effectiveDirective, blockedURL, sample, disposition } =
      report.body;
    return {
      page: documentURL,
      directive: effectiveDirective,
      blocked: blockedURL,
      sample,
      disposition,
    };
  }

  // Older format (`report-uri`): `{ 'csp-report': { 'document-uri', 'effective-directive', ... } }`
  const old = report?.['csp-report'];
  if (old) {
    return {
      page: old['document-uri'],
      directive: old['effective-directive'] || old['violated-directive'],
      blocked: old['blocked-uri'],
      sample: old['script-sample'],
      disposition: old.disposition,
    };
  }

  return null;
}

export default async (request) => {
  const contentType = request.headers.get('content-type') || '';
  const isReport =
    contentType.startsWith('application/reports+json') ||
    contentType.startsWith('application/csp-report');
  const contentLength = Number(request.headers.get('content-length') || 0);

  if (request.method === 'POST' && isReport && contentLength <= maxBodySize) {
    try {
      const text = (await request.text()).slice(0, maxBodySize);
      const data = JSON.parse(text);
      const reports = (Array.isArray(data) ? data : [data]).slice(
        0,
        maxReportsLogged,
      );

      for (const report of reports) {
        const summary = summarise(report);

        if (summary) {
          // `report` = only reported (report-only rules); `enforce` = actually blocked
          const mode =
            summary.disposition === 'report' ? 'report-only' : 'blocked';
          const sample = summary.sample
            ? ` | sample: ${String(summary.sample).slice(0, 40)}`
            : '';
          console.log(
            `[CSP report] ${mode} ${summary.directive}: ${trimUrl(summary.blocked) || '(unknown)'} ` +
              `| page: ${pagePath(summary.page)}${sample}`,
          );
        }
      }
    } catch {
      // Not valid JSON: not a real report, so it's ignored
    }
  }

  // Always the same empty reply, whatever was sent
  return new Response(null, { status: 204 });
};

// Only runs for this one path. Every other request is untouched.
export const config = {
  path: '/csp-reports',
};
