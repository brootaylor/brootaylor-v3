/**
 * `scriptChunks`: the addresses of the extra script files Rollup builds alongside `main.mjs`
 * (eg. `/scripts/modules/salary-CBsqf8my.mjs`).
 *
 * `main.mjs` loads these on demand with `import()` (see `src/scripts/main-modules.mjs`). The service worker
 * (`src/serviceworker.njk`) uses this list to save them when it installs, so they work offline and repeat
 * visits don't need the network for them.
 *
 * Why it's a data file: the service worker is a template, and templates get build-time values through
 * Eleventy's data. The names only exist once Rollup has built the scripts, so they're read from `dist/` here,
 * the same way `assetVersion.js` reads the built files.
 *
 * Rollup puts a hash of each file's content in its name (`chunkFileNames` in `config/rollup.config.mjs`), so
 * the names change whenever the files do. Those names are also written inside `main.mjs`, so any change to
 * them changes `assetVersion` too, and the service worker replaces its saved copies.
 *
 * - `main.mjs` itself isn't listed: the pages request it with `?version=` on the end, so the service worker
 *   adds it with that address.
 * - Source maps (`.map`) aren't listed: only browser developer tools ask for them.
 * - If the folder doesn't exist yet (eg. at the start of `npm run dev`, where everything runs at the same
 *   time), the list is empty and the service worker simply saves no extra files.
 * - Every `npm run build` empties `dist/` first (`prebuild` runs `clean`), so the list only ever holds the
 *   current build's files. (During `npm run dev`, Rollup's watch mode can leave old ones behind, but the
 *   service worker is only switched on for production builds.)
 */

import { readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Where Rollup writes the module scripts (`output.dir` in `config/rollup.config.mjs`)
const modulesFolder = fileURLToPath(
  new URL('../../dist/scripts/modules/', import.meta.url),
);

export default function scriptChunks() {
  if (!existsSync(modulesFolder)) {
    return [];
  }

  return readdirSync(modulesFolder)
    .filter((file) => file.endsWith('.mjs') && file !== 'main.mjs')
    .sort()
    .map((file) => `/scripts/modules/${file}`);
}
