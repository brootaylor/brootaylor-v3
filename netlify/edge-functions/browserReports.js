/*
 * Browser reports
 * ===============
 *
 * Browsers post short reports here about problems they find on the site, and this writes one line per report
 * to Netlify's edge function logs (Netlify UI: Logs > Edge Functions), so problems show up instead of going
 * unnoticed. The `Reporting-Endpoints` header that points browsers here is set in
 * `lib/utils/headers/contentSecurityPolicy.js`.
 *
 * What gets reported:
 * - Content Security Policy (CSP) violations: something the policy blocked, or would block (the report-only
 *   Trusted Types rules)
 * - Anything else browsers send to the `default` endpoint, eg. deprecation reports (the site uses a browser
 *   feature that's going away) and intervention reports (the browser stepped in, eg. blocked something heavy)
 *
 * Browsers send them in two formats:
 * - `application/reports+json`: the Reporting API (`report-to`), a list of reports of any type
 * - `application/csp-report`: the older `report-uri` format, one CSP report
 *
 * Privacy: only what helps fix a problem is logged (the page path, what happened, and a short code sample for
 * CSP reports). No IP address or browser details, and query strings are removed from addresses. The AI crawler
 * edge function (`aiAgents.js`), which logs every request's browser details, skips this path for the same reason.
 * Only POST requests reach this function (see `config` at the bottom; anything else gets the site's 404 page).
 * A POST that isn't a report is ignored, and every reply is the same empty 204, so the endpoint gives nothing away.
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
 * Turns one report (either format) into a single log line, or `null` if it isn't a report
 */
function describe(report) {
  // Older CSP format (`report-uri`): `{ 'csp-report': { 'document-uri', 'effective-directive', ... } }`
  const old = report?.['csp-report'];
  if (old) {
    return describeCsp({
      page: old['document-uri'],
      directive: old['effective-directive'] || old['violated-directive'],
      blocked: old['blocked-uri'],
      sample: old['script-sample'],
      disposition: old.disposition,
    });
  }

  // Reporting API (`report-to`): `{ type, url, body: { ... } }`
  if (!report?.type || !report.body) {
    return null;
  }

  if (report.type === 'csp-violation') {
    const { documentURL, effectiveDirective, blockedURL, sample, disposition } =
      report.body;
    return describeCsp({
      page: documentURL,
      directive: effectiveDirective,
      blocked: blockedURL,
      sample,
      disposition,
    });
  }

  // Other report types (eg. `deprecation`, `intervention`): an id or reason, a message and where it happened
  const { id, featureId, reason, message, sourceFile, lineNumber } =
    report.body;
  const what = [
    id || featureId || reason,
    message && String(message).slice(0, 160),
  ]
    .filter(Boolean)
    .join(': ');
  const where = sourceFile
    ? ` | source: ${trimUrl(sourceFile)}:${lineNumber ?? '?'}`
    : '';
  return `[Browser report] ${String(report.type).slice(0, 40)} ${what || '(no details)'} | page: ${pagePath(report.url)}${where}`;
}

function describeCsp({ page, directive, blocked, sample, disposition }) {
  // `report` = only reported (report-only rules); `enforce` = actually blocked
  const mode = disposition === 'report' ? 'report-only' : 'blocked';
  const sampleText = sample ? ` | sample: ${String(sample).slice(0, 40)}` : '';
  return (
    `[CSP report] ${mode} ${directive}: ${trimUrl(blocked) || '(unknown)'} ` +
    `| page: ${pagePath(page)}${sampleText}`
  );
}

export default async (request) => {
  const contentType = request.headers.get('content-type') || '';
  const isReport =
    contentType.startsWith('application/reports+json') ||
    contentType.startsWith('application/csp-report');
  const contentLength = Number(request.headers.get('content-length') || 0);

  if (isReport && contentLength <= maxBodySize) {
    try {
      const text = (await request.text()).slice(0, maxBodySize);
      const data = JSON.parse(text);
      const reports = (Array.isArray(data) ? data : [data]).slice(
        0,
        maxReportsLogged,
      );

      for (const report of reports) {
        const line = describe(report);
        if (line) {
          console.log(line);
        }
      }
    } catch {
      // Not valid JSON: not a real report, so it's ignored
    }
  }

  // Always the same empty reply, whatever was sent
  return new Response(null, { status: 204 });
};

// Only runs for reports posted to this one path. Every other request is untouched.
export const config = {
  path: '/browser-reports',
  method: 'POST',
};
