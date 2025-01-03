// Import the list of known bot user-agents from a JSON file
import agents from '../../src/_data/bots.json' assert { type: 'json' };

// Define a list of file extensions to exempt from bot detection
const exemptFileTypes = ['.mjs', '.js', '.css', '.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico'];

export default async (request) => {
  // Get the request URL
  const url = new URL(request.url);

  // Extract the file extension from the URL path
  const fileExtension = url.pathname.slice(url.pathname.lastIndexOf('.'));

  // Check if the request is for a file type we want to exempt
  if (exemptFileTypes.includes(fileExtension)) {
    // If it matches, return early and allow the request to proceed without checking for bots
    console.log(`[Edge Function] Exempting request for: ${url.pathname}`);
    return;
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
    return new Response('Access denied for bots', { status: 401 });
  }

  // Otherwise, continue with the request as normal
  return;
};

// The configuration for this edge function
// `path: "/*"` applies the function to all requests on the site
export const config = {
  path: '/*',
};
