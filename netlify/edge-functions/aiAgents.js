/*
 * AI crawler blocking
 * ===================
 *
 * Blocks known AI training / AI answer synthesis crawlers (and anything that follows the hidden honeypot link),
 * while allowing normal visitors and search engine bots. Blocked requests get the site's 403 page.
 *
 * Logging (Netlify UI: Logs > Edge Functions): only blocked requests are logged, one line each, with the page
 * path (no query string) and the user agent. Ordinary visits aren't logged at all, in line with the privacy
 * page: the site doesn't collect information about what people read.
 */

// The list of known AI crawler user agents. It's intentionally limited to AI training / answer synthesis
// agents only, so search engines aren't affected. The same list also builds `robots.txt` (`src/robots.njk`).
// A few names on it (eg. `Google-Extended`, `Applebot-Extended`) only mean something in `robots.txt` and
// never appear in a user agent, so they never match here. That's harmless.
import aiAgents from '../../src/_data/ai_agents.json' with { type: 'json' };

// Lowercased once, when the function loads, rather than on every request
const aiAgentNames = aiAgents.map((agent) => String(agent).toLowerCase());

// Static assets aren't useful for AI training, so requests for them are never blocked
const exemptFileTypes = [
  '.mjs',
  '.js',
  '.css',
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.svg',
  '.webp',
  '.ico',
];

// The honeypot page (`src/_content/pages/honeypot.md`). The link to it is hidden from people (see
// `src/scripts/features/honeypot.mjs`), so whatever requests it is almost certainly a scraper. These are the
// addresses the page can be reached at. An exact match, so other pages with "honeypot" in their address
// (eg. a post about honeypots) aren't blocked.
const honeypotPaths = ['/honeypot', '/honeypot/', '/honeypot.html'];

// The site's custom 403 page, as a path. It's turned into a full address from each request, so it's always
// served by the same site that's answering: `netlify dev` locally, a deploy preview, or the live site.
const errorPagePath = '/error/403.html';

/**
 * Returns a 403 Forbidden response with the site's custom error page.
 * Returning a 403 explicitly signals that access is denied.
 *
 * @param {Request} request - The incoming request (used to find the error page on the same site).
 * @returns {Promise<Response>} - 403 Forbidden response.
 */
const respondWith403 = async (request) => {
  const headers = {
    'Content-Type': 'text/html; charset=utf-8',
    // Additional policy signal indicating AI usage is not permitted
    'X-Robots-Tag': 'noai, noimageai',
  };

  try {
    const errorPage = await fetch(new URL(errorPagePath, request.url));
    if (errorPage.ok) {
      return new Response(await errorPage.text(), { status: 403, headers });
    }
  } catch {
    // The error page couldn't be fetched. Fall through to the plain reply below, so the request is still
    // blocked rather than failing with an error.
  }

  return new Response('Forbidden', {
    status: 403,
    headers: { ...headers, 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

/**
 * Checks each request and blocks AI crawlers and honeypot visits. Everything else continues as normal.
 *
 * @param {Request} request - The incoming request.
 * @returns {Promise<Response|undefined>} - A 403 response, or nothing to let the request through.
 */
export default async (request) => {
  const url = new URL(request.url);
  const ua = request.headers.get('user-agent') || '';

  // The file extension, if the path has one (eg. `.css`)
  const dot = url.pathname.lastIndexOf('.');
  const fileExtension = dot !== -1 ? url.pathname.slice(dot).toLowerCase() : '';

  // Let requests for static assets through without checking
  if (exemptFileTypes.includes(fileExtension)) {
    return;
  }

  // Block any request for the honeypot page. Its user agent is logged so new scrapers can be spotted and
  // added to the list.
  if (honeypotPaths.includes(url.pathname)) {
    console.log(
      `[Edge Function] Honeypot triggered | page: ${url.pathname} | user agent: ${ua}`,
    );
    return respondWith403(request);
  }

  // Block known AI training / answer synthesis crawlers. Their user agent includes the crawler's name, which
  // is the useful part of the log line.
  const uaLower = ua.toLowerCase();
  const isAiAgent = aiAgentNames.some((name) => uaLower.includes(name));

  if (isAiAgent) {
    console.log(
      `[Edge Function] AI crawler blocked | page: ${url.pathname} | user agent: ${ua}`,
    );
    return respondWith403(request);
  }

  // Not an AI crawler: let the request through
  return;
};

// Runs on all paths (wildcard), except where browsers post reports (`browserReports.js`). Reports come from
// visitors' browsers, never from AI crawlers, so there's nothing to check there.
export const config = {
  path: '/*',
  excludedPath: ['/browser-reports'],
};
