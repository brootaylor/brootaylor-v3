/*
 * This Edge function performs AI bot detection and error page handling.
 * Its purpose is to block known AI training / AI answer synthesis crawlers
 * while allowing normal users and search engine bots.
 */

// Load environment variables in local development
if (typeof process !== 'undefined' && process.env.LOCAL_ENV === 'true') {
  try {
    await import('dotenv/config');
  } catch (err) {
    console.error('Failed to load dotenv:', err);
  }
}

// Use a fallback for environment variables if `process.env` is undefined
const LOCAL_ENV =
  (typeof process !== 'undefined' && process.env.LOCAL_ENV === 'true') || false;

// Determine the base URL for local and production environments
const BASE_URL = LOCAL_ENV
  ? 'http://localhost:8888'
  : 'https://brootaylor.com';

// Define the URL for the custom 403 error page
const ERROR_403_URL = `${BASE_URL}/error/403.html`;

// Import the list of known AI crawler user-agents from a JSON file
// This list is intentionally limited to AI training / answer synthesis agents only
import aiAgents from '../../src/_data/ai_agents.json' with { type: 'json' };

// Define the list of file extensions to exempt from AI bot detection
// Static assets are not useful for AI training and should not be blocked
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
  '.ico'
];

// Define the honeypot path (optional)
// Requests to this path are always blocked
const honeypotPath = '/honeypot';

/**
 * Helper function to generate a 403 response with a custom error page.
 * Returning a 403 explicitly signals that access is denied.
 *
 * @returns {Response} - 403 Forbidden response with a custom error page.
 */
const respondWith403 = async () => {
  const errorPage = await fetch(ERROR_403_URL).then(res => res.text());

  return new Response(errorPage, {
    status: 403,
    headers: {
      'Content-Type': 'text/html',
      // Additional policy signal indicating AI usage is not permitted
      'X-Robots-Tag': 'noai, noimageai'
    },
  });
};

/**
 * Main function that handles incoming requests and applies AI bot detection.
 *
 * @param {Request} request - The incoming request object.
 * @returns {Response|void} - Either blocks the request or allows it to continue.
 */
export default async (request) => {
  // Parse the request URL and User-Agent header
  const url = new URL(request.url);
  const ua = request.headers.get('user-agent') || '';

  // Extract the file extension safely (handles paths with no dot)
  const dot = url.pathname.lastIndexOf('.');
  const fileExtension = dot !== -1 ? url.pathname.slice(dot).toLowerCase() : '';

  // Log request details for debugging and visibility
  console.log(`[Edge Function] User agent: ${ua}`);
  console.log(`[Edge Function] Request URL: ${request.url}`);

  // Exempt requests for static assets from AI bot detection
  if (exemptFileTypes.includes(fileExtension)) {
    console.log(`[Edge Function] Exempting static asset: ${url.pathname}`);
    return;
  }

  // Block any requests to the honeypot path
  if (url.pathname.includes(honeypotPath)) {
    console.log(`[Edge Function] Honeypot triggered by: ${ua}`);
    return respondWith403();
  }

  // Check whether the User-Agent matches any known AI crawler
  const uaLower = ua.toLowerCase();
  const isAiAgent = aiAgents.some(agent =>
    uaLower.includes(String(agent).toLowerCase())
  );

  // Block known AI training / answer synthesis crawlers
  if (isAiAgent) {
    console.log(`[Edge Function] AI crawler detected`);
    console.log(`[Edge Function] Blocked User-Agent: ${ua}`);
    return respondWith403();
  }

  // Allow the request if no AI crawler is detected
  return;
};

// This config object sets the Edge function to run on all paths (wildcard)
export const config = {
  path: '/*',
};
