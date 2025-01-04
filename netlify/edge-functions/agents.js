/*
 * This Edge function performs (known) bot detection and error page handling.
 */

// Load environment variables in local development
if (typeof process !== 'undefined' && process.env.LOCAL_ENV === 'true') {
  await import('dotenv/config');
}

// Use a fallback for environment variables if `process.env` is undefined
const LOCAL_ENV = (typeof process !== 'undefined' && process.env.LOCAL_ENV === 'true') || false;

// Determine the base URL for local and production environments
const BASE_URL = LOCAL_ENV
  ? 'http://localhost:8888'
  : 'https://brootaylor.com';

// Import the list of known bot user-agents from a JSON file
import agents from '../../src/_data/bots.json' assert { type: 'json' };

// Define a list of file extensions to exempt from bot detection
const exemptFileTypes = ['.mjs', '.js', '.css', '.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico'];

// Define the honeypot path (a page or endpoint only visible to bots)
const honeypotPath = '/honeypot';

// Define the URLs for the custom error pages
const ERROR_403_URL = `${BASE_URL}/error/403.html`;

/**
 * Main function that handles incoming requests and applies bot detection and error page logic.
 * @param {Request} request - The incoming request object.
 * @returns {Response} - The response object, either allowing the request or blocking it.
 */
export default async (request) => {
  // Get the request URL
  const url = new URL(request.url);

  // Extract the file extension from the URL path
  const fileExtension = url.pathname.slice(url.pathname.lastIndexOf('.'));

  // Check if the request is for a file type we want to exempt
  if (exemptFileTypes.includes(fileExtension)) {
    console.log(`[Edge Function] Exempting request for: ${url.pathname}`);
    return;
  }

  // Check if the request is targeting the honeypot page
  if (url.pathname.includes(honeypotPath)) {
    console.log(`[Edge Function] Honeypot triggered by: ${request.headers.get('user-agent')}`);
    return new Response(await fetch(ERROR_403_URL).then(res => res.text()), {
      status: 403, // 403 Forbidden
      headers: {
        'Content-Type': 'text/html',
      },
    });
  }

  // Retrieve the User-Agent header from the incoming request
  const ua = request.headers.get('user-agent') || '';
  console.log(`[Edge Function] User agent: ${ua}`); // Log the User-Agent for debugging

  // Log the requested URL for context
  console.log(`[Edge Function] Request URL: ${request.url}`);

  // Check if the User-Agent matches any known bot user-agent in the list
  let isBot = false;

  agents.forEach(agent => {
    if (ua.toLowerCase().includes(agent.toLowerCase())) {
      isBot = true;
      return;
    }
  });

  // Log the result of the bot detection
  console.log(`[Edge Function] Bot detected: ${isBot}`);

  // If the requester is identified as a bot, return a 401 Unauthorized response
  if (isBot) {
    return new Response(await fetch(ERROR_403_URL).then(res => res.text()), {
      status: 403, // 403 Forbidden
      headers: {
        'Content-Type': 'text/html',
      },
    });
  }

  // Otherwise, continue with the request as normal
  return;
};

// The configuration for this edge function
// `path: "/*"` applies the function to all requests on the site
export const config = {
  path: '/*',
};
