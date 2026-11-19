/**
 * `assetVersion`: a short fingerprint of the site's CSS and JS, used to "cache-bust" them.
 *
 * It goes on the end of their addresses (eg. `/styles/main.css?version=3f9c1a2b7e`) and into the service
 * worker's cache names (`src/serviceworker.njk`). It only changes when the CSS or JS actually changes, so:
 * - returning visitors keep using the copies they already have until there's a real update, and
 * - the service worker only clears its caches (and re-downloads its offline pages) when something it relies
 *   on has changed.
 * The site is rebuilt every day (`.github/workflows/build.yml`), so a build-time stamp would make visitors
 * re-download everything daily, even when nothing had changed.
 *
 * How: a sha256 hash of the built files, shortened to 10 characters. They're read from `dist/`, which works
 * because `npm run build` builds the styles and scripts before Eleventy runs (see `package.json`), and
 * PostCSS runs as part of the styles step, so the file that's hashed is the final one.
 * The on-demand scripts (eg. the `<video-facade>` video player) are covered too: Rollup puts a hash in their file names,
 * and those names are written inside `main.mjs`.
 *
 * If none of the files exist yet (eg. at the start of `npm run dev`, where everything runs at the same time),
 * it falls back to a build-time stamp, so each build still gets a new address.
 */

import { createHash } from 'node:crypto';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// The built files to fingerprint, relative to the project root.
// `vendor.js` only exists when `scriptsVendor` is on in `_data/site.js`.
const assetFiles = [
  'dist/styles/main.css',
  'dist/scripts/modules/main.mjs',
  'dist/scripts/vendor/vendor.js',
];

// The project root (two folders up from `src/_data/`), so this works wherever Eleventy is run from
const projectRoot = fileURLToPath(new URL('../../', import.meta.url));

export default function assetVersion() {
  const hash = createHash('sha256');
  let filesFound = 0;

  for (const file of assetFiles) {
    const filePath = projectRoot + file;
    if (existsSync(filePath)) {
      // The file name goes in too, so moving content between files still changes the fingerprint
      hash.update(file);
      hash.update(readFileSync(filePath));
      filesFound += 1;
    }
  }

  if (filesFound === 0) {
    return Date.now().toString(36);
  }

  return hash.digest('hex').slice(0, 10);
}
