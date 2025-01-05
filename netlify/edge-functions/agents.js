/*
 * This Edge function performs (known) bot detection, suspicious path blocking, and error page handling.
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
const LOCAL_ENV = (typeof process !== 'undefined' && process.env.LOCAL_ENV === 'true') || false;

// Determine the base URL for local and production environments
const BASE_URL = LOCAL_ENV
  ? 'http://localhost:8888'
  : 'https://brootaylor.com';

// Define the URL for the custom 403 error page
const ERROR_403_URL = `${BASE_URL}/error/403.html`;

// Import the list of known bot user-agents from a JSON file
import agents from '../../src/_data/agents.json' assert { type: 'json' };

// Define the list of file extensions to exempt from bot detection
const exemptFileTypes = [
  '.mjs', '.js', '.css', '.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico'
];

// Define a list of suspicious paths to block. Typically Wordpress-related paths and common bot paths.
const suspiciousPaths = [
  '/install.php', '/xmlrpc.php', '/wp-includes', '/wlwmanifest.xml', '/wp-admin',
  '/wp-content', '/wordpress', '/wp-login.php', '/bypass.php', '/avaa.php', '/alfa-rex2.php',
  '/.env', '/.env.local', '/.env.production', '/.env.development', '/.env.staging'
];

// Define the honeypot path (a page or endpoint only visible to bots)
const honeypotPath = '/honeypot';

/**
 * Helper function to generate a 403 response with a custom error page.
 * @returns {Response} - 403 Forbidden response with a custom error page.
 */
const respondWith403 = async () => {
  const errorPage = await fetch(ERROR_403_URL).then(res => res.text());
  return new Response(errorPage, {
    status: 403,
    headers: { 'Content-Type': 'text/html' },
  });
};

/**
 * Main function that handles incoming requests and applies bot detection, suspicious path blocking, and error page logic.
 * @param {Request} request - The incoming request object.
 * @returns {Response} - The response object, either allowing the request or blocking it.
 */
export default async (request) => {
  // Get the request URL and User-Agent header
  const url = new URL(request.url);
  const ua = request.headers.get('user-agent') || '';

  // Extract the file extension from the URL path
  const fileExtension = url.pathname.slice(url.pathname.lastIndexOf('.'));

  // Log the request information for debugging
  console.log(`[Edge Function] User agent: ${ua}`);
  console.log(`[Edge Function] Request URL: ${request.url}`);

  // Exempt specific file types from bot detection
  if (exemptFileTypes.includes(fileExtension)) {
    console.log(`[Edge Function] Exempting request for: ${url.pathname}`);
    return;
  }

  // Block requests to suspicious paths
  if (suspiciousPaths.some(path => url.pathname.includes(path))) {
    console.log(`[Edge Function] Blocked suspicious path: ${url.pathname}`);
    return respondWith403();
  }

  // Block requests to the honeypot path
  if (url.pathname.includes(honeypotPath)) {
    console.log(`[Edge Function] Honeypot triggered by: ${ua}`);
    return respondWith403();
  }

  // Block requests with empty User-Agent headers
  if (!ua) {
    console.log(`[Edge Function] Blocked empty User-Agent for: ${url.pathname}`);
    return respondWith403();
  }

  // Initialise the bot flag
  let isBot = false;

  // Check if the User-Agent matches any known bot user-agent in the list
  isBot = agents.some(agent => ua.toLowerCase().includes(agent.toLowerCase()));

  if (isBot) {
    console.log(`[Edge Function] Bot detected: ${isBot}`);
    console.log(`[Edge Function] Blocked bot: ${ua}`);
    return respondWith403();
  }

  // Allow the request if no issues detected
  console.log(`[Edge Function] Bot detected: ${isBot}`);
  return;
};

// This config object sets the Edge function to run on all paths (wildcard)
export const config = {
  path: '/*',
};
