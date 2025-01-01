import { Config } from "@netlify/edge-functions";
import agents from "../../src/_data/bots.json" with { type: "json" };

export default async (request: Request) => {
  const ua = request.headers.get('user-agent') || '';
  const url = new URL(request.url);

  // **Bot detection logic**: Check if the user-agent matches a known bot
  const isBot = agents.some(agent => ua.toLowerCase().includes(agent.toLowerCase()));

  console.log(`Request URL: ${url.pathname}`);
  console.log(`User agent: ${ua}`);
  console.log(`Is bot: ${isBot}`);

  // If not a bot, forward the request as-is
  if (!isBot) {
    return fetch(request); // Pass through to original resource
  }

  // Custom HTML message for human users (only if bots are detected)
  return new Response('<h1>Access Denied</h1><p>AI bots are not allowed.</p>', {
    status: 401,
    headers: { 'Content-Type': 'text/html' }
  });
};

// Edge Function configuration: Applies to all routes
export const config: Config = {
  path: "/*",
};
