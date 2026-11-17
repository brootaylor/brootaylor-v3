import { createHash } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * Content Security Policy (CSP)
 * =============================
 *
 * The CSP tells browsers what each page is allowed to load and run, which is one of the best protections
 * against injected code. It's built here, after every Eleventy build, and written to `dist/_headers`, which
 * Netlify reads as extra header rules. Every other header (HSTS, Referrer-Policy etc.) is in `netlify.toml`.
 *
 * Inline `<script>` and `<style>` blocks are allowed automatically
 * ----------------------------------------------------------------
 * The policy only lets an inline block run if its `'sha256-…'` hash is listed. A hash is worked out from the
 * block's exact text, so this collects the hash of every inline `<script>` and `<style>` block on every built page.
 * That means you can add or edit inline JS or CSS anywhere (eg. `head:` or `foot:` front matter, or a template)
 * and it just works, with nothing to copy in by hand. Anything injected into a page later (eg. by an attacker)
 * isn't in the built HTML, so it has no matching hash and the browser blocks it.
 *
 * The hash list is shared by every page (one `/*` rule), so it stays a single short header. Keep it that way
 * by putting larger or repeated code in files (`src/scripts`, `src/styles`) rather than many inline blocks.
 *
 * Things to know:
 * - Event handler attributes (eg. `onclick="…"`) are still blocked. Hashes can't allow them. Use
 *   `addEventListener` in a script instead.
 * - `style="…"` attributes are allowed (`style-src-attr` below).
 * - Only add inline code you wrote. If a page ever includes HTML from somewhere else at build time
 *   (eg. webmentions or a feed), clean or escape it first. Otherwise a `<script>` hidden in it would be hashed
 *   and allowed like your own.
 * - Netlify uses the `netlify.toml` value if the same header is set in both places. So don't add a
 *   `Content-Security-Policy` there, or this one is ignored.
 * - `_headers` isn't written during incremental builds (`--incremental`), which only include the changed pages.
 *   The file from the last full build is kept.
 */

// Classic and module scripts, import maps and speculation rules run under the CSP, so they need a hash.
// Data blocks (eg. JSON-LD, `type="application/ld+json"`) aren't run, so they're skipped.
const hashedScriptTypes = [
  '',
  'text/javascript',
  'module',
  'importmap',
  'speculationrules',
];

const scriptPattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
const stylePattern = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
// Copes with attribute values that the HTML minifier left unquoted (eg. `type=module`)
const typePattern = /\btype\s*=\s*["']?([^"'\s>]+)/i;
const srcPattern = /\bsrc\s*=/i;

// Where violation reports are sent (handled by `netlify/edge-functions/cspReports.js`)
const reportPath = '/csp-reports';
const reportEndpointName = 'csp';

// A warning (not an error) when the header gets long, as a nudge to move inline code into files
const headerLengthWarning = 4000;

/**
 * Builds the enforced policy. Each line is one directive.
 *
 * @param {string[]} scriptHashes - `'sha256-…'` sources for the inline scripts
 * @param {string[]} styleHashes - `'sha256-…'` sources for the inline style blocks
 */
function buildPolicy(scriptHashes, styleHashes) {
  return [
    // Anything not listed below (connections, fonts, media, workers, the web app manifest etc.) can only come
    // from this site. It's a safety net, so a new kind of request has to be allowed on purpose.
    "default-src 'self'",

    // Scripts: files from this site, plus the inline scripts in the built pages (by hash).
    // 'report-sample' adds the first 40 characters of anything blocked to the report, to help find it.
    // Not 'strict-dynamic': it would block `main.mjs`, because it ignores 'self'. It's meant for sites
    // whose script loaders pull in third-party code, and this site loads none.
    ['script-src', "'self'", ...scriptHashes, "'report-sample'"].join(' '),

    // Stylesheets from this site, plus the inline `<style>` blocks in the built pages (by hash)
    ['style-src', "'self'", ...styleHashes, "'report-sample'"].join(' '),

    // `style="…"` attributes are allowed, so inline CSS can still be added that way when it's handy.
    // (Browsers that don't know this directive, eg. KaiOS 2.5, use `style-src` instead and ignore them.)
    "style-src-attr 'unsafe-inline'",

    // Images: this site, YouTube video thumbnails and the 11ty IndieWeb avatar service (blogroll icons)
    "img-src 'self' i.ytimg.com *.indieweb-avatar.11ty.dev",

    // Frames: only YouTube's privacy-enhanced player (the click-to-load videos).
    // The Spotify audio component (`components/core/audios`) would need `https://open.spotify.com` adding here.
    'frame-src https://www.youtube-nocookie.com',

    // No plugins (`<object>`, `<embed>`)
    "object-src 'none'",

    // No `<base>` tag at all, so an injected one can't point the site's relative links somewhere else
    "base-uri 'none'",

    // Forms can only submit to this site (the contact form posts to /contact/thanks)
    "form-action 'self'",

    // No site can show these pages in a frame, which protects against clickjacking.
    // Matches `X-Frame-Options: DENY` in `netlify.toml`, which older browsers use instead.
    "frame-ancestors 'none'",

    // Where to send violation reports. `report-to` is the current way; `report-uri` is for browsers
    // that don't support it yet (browsers that do, ignore `report-uri`).
    `report-uri ${reportPath}`,
    `report-to ${reportEndpointName}`,
  ].join('; ');
}

/**
 * Trusted Types, in report-only mode for now
 *
 * Once enforced, no script can write a plain string into the page with `innerHTML`, `outerHTML` or
 * `document.write`, which is how most injected code gets in. (Use `textContent`, `createElement` or
 * `replaceChildren()` instead.) The only call on this site it affects is service worker registration, which goes
 * through the `service-worker` policy in `scripts/features/serviceWorker.mjs`. No other policy name is allowed.
 *
 * Report-only means nothing is blocked: browsers just send a report. If the reports stay empty and you're happy
 * with those rules, move these two directives into the enforced policy above.
 */
const reportOnlyPolicy = [
  "require-trusted-types-for 'script'",
  'trusted-types service-worker',
  `report-uri ${reportPath}`,
  `report-to ${reportEndpointName}`,
].join('; ');

const sha256 = (text) =>
  `'sha256-${createHash('sha256').update(text, 'utf8').digest('base64')}'`;

/**
 * Collects the hash of every inline script and style block in the built HTML pages
 *
 * @param {Array<{outputPath: string|false, content: string}>} results - Eleventy's build results
 */
function collectInlineHashes(results) {
  const scriptHashes = new Set();
  const styleHashes = new Set();

  for (const { outputPath, content } of results) {
    if (!outputPath || !outputPath.endsWith('.html')) {
      continue;
    }

    for (const [, attributes, code] of content.matchAll(scriptPattern)) {
      const type = attributes.match(typePattern)?.[1].toLowerCase() ?? '';

      if (!srcPattern.test(attributes) && hashedScriptTypes.includes(type)) {
        scriptHashes.add(sha256(code));
      }
    }

    for (const [, css] of content.matchAll(stylePattern)) {
      styleHashes.add(sha256(css));
    }
  }

  // Sorted, so the file only changes when the inline code does
  return {
    scriptHashes: [...scriptHashes].sort(),
    styleHashes: [...styleHashes].sort(),
  };
}

/**
 * `eleventy.after` handler: writes `_headers` into the output folder
 */
export async function writeContentSecurityPolicy({
  results,
  directories,
  incremental,
}) {
  if (incremental) {
    return;
  }

  const { scriptHashes, styleHashes } = collectInlineHashes(results);
  const policy = buildPolicy(scriptHashes, styleHashes);

  // `_headers` format: a path, then indented `Name: value` lines. Lines starting with `#` are comments.
  const headersFile = [
    '# Generated by lib/utils/headers/contentSecurityPolicy.js after each build. Edit that file, not this one.',
    '/*',
    `  Content-Security-Policy: ${policy}`,
    `  Content-Security-Policy-Report-Only: ${reportOnlyPolicy}`,
    `  Reporting-Endpoints: ${reportEndpointName}="${reportPath}"`,
    '',
  ].join('\n');

  await writeFile(path.join(directories.output, '_headers'), headersFile);

  if (policy.length > headerLengthWarning) {
    console.warn(
      `[CSP] The Content-Security-Policy header is ${policy.length} characters long ` +
        `(${scriptHashes.length} inline scripts, ${styleHashes.length} inline style blocks). ` +
        'Consider moving some inline code into files in `src/scripts` or `src/styles`.',
    );
  }
}
