import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

/**
 * CSP inline script hash check
 * ============================
 *
 * The Content Security Policy in `netlify.toml` only lets an inline `<script>` run if its `'sha256-…'` hash is
 * listed in `script-src`. The hash is worked out from the script's exact text, so changing even one character of
 * an inline script (eg. `components/chrome/meta/colour-scheme-init.js`) means the browser blocks it until
 * `netlify.toml` gets the new hash.
 *
 * This runs after every Eleventy build. It hashes each inline script in the built home page and prints a warning
 * with the hash to copy in if `netlify.toml` doesn't have it. It only warns and never fails the build: a blocked
 * colour scheme script just means a brief flash of the wrong colours, because `colourScheme.mjs` re-applies
 * the saved choice as a backup.
 *
 * Only classic scripts are checked: `<script>` with no attributes. JSON-LD (`type="application/ld+json"`) isn't
 * run by browsers, so the CSP doesn't apply to it.
 */

// Inline scripts are the same on every page (they come from the shared `<head>`), so the home page is enough
const pageToCheck = 'index.html';
const inlineScriptPattern = /<script>([\s\S]*?)<\/script>/g;

export async function checkCspScriptHashes({ results }) {
  const page = results.find(({ url }) => url === '/');

  if (!page) {
    console.warn(
      `[CSP check] Couldn't find ${pageToCheck} in the build results, so inline script hashes weren't checked.`,
    );
    return;
  }

  const netlifyToml = await readFile(
    new URL('../../../netlify.toml', import.meta.url),
    'utf8',
  );

  for (const [, script] of page.content.matchAll(inlineScriptPattern)) {
    const hash = `'sha256-${createHash('sha256').update(script, 'utf8').digest('base64')}'`;

    if (!netlifyToml.includes(hash)) {
      console.warn(
        `[CSP check] An inline <script> in ${pageToCheck} isn't allowed by the Content Security Policy, so browsers will block it.\n` +
          `  Add this hash to \`script-src\` in netlify.toml (and remove any old hash it replaces): ${hash}\n` +
          `  Script starts: ${script.trim().slice(0, 80)}…`,
      );
    }
  }
}
