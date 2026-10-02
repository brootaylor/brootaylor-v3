// lighthouse.mjs
//
// Lighthouse audit for the build (and, optionally, the live site).
//
// Purpose:
//   Audit the homepage with Lighthouse and warn when any category score
//   drops below its threshold. Runs as part of `deploy:build`, so it behaves
//   the same locally (`npm run netlify-build`) and on Netlify.
//
// Usage:
//   node config/lighthouse.mjs           Audit the local build in `dist/`
//   node config/lighthouse.mjs --live    Audit https://brootaylor.com instead
//   node config/lighthouse.mjs --view    Also open the HTML report when done
//
// Behavior:
//   - informational only - never fails the build
//   - exit code is always 0 (low scores and audit errors are logged as warnings)
//   - Chrome (Chrome for Testing, stable) is downloaded into
//     `node_modules/.cache/chrome` on first run and reused after that
//     (falls back to the already-downloaded Chrome if the latest version can't be fetched)
//   - `dist/` is served from a temporary local server (gzip enabled, like Netlify)
//   - HTML report saved to `audits/lighthouse_report/`

import { createServer } from 'node:http';
import { readFile, stat, mkdir, writeFile } from 'node:fs/promises';
import { join, extname, resolve, sep } from 'node:path';
import { gzipSync } from 'node:zlib';
import { spawn } from 'node:child_process';
import {
  Browser,
  install,
  getInstalledBrowsers,
  resolveBuildId,
  detectBrowserPlatform,
} from '@puppeteer/browsers';
import * as chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';

const liveUrl = 'https://brootaylor.com/';
const distDir = resolve('dist');
const chromeCacheDir = resolve('node_modules/.cache/chrome');
const reportDir = resolve('audits/lighthouse_report');

// Minimum category scores (0-1)
const thresholds = {
  performance: 0.9,
  accessibility: 0.9,
  'best-practices': 0.9,
  seo: 0.9,
};

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

// Text formats Netlify compresses
const compressible = /^(text\/|application\/(json|xml|manifest)|image\/svg)/;

const args = process.argv.slice(2);
const isLive = args.includes('--live');
const shouldView = args.includes('--view');

/**
 * Download the latest stable Chrome (if not already cached) and return its executable path.
 * If that fails (e.g. the version service is unreachable), fall back to an already-downloaded Chrome.
 */
async function getChromePath() {
  try {
    const platform = detectBrowserPlatform();
    const buildId = await resolveBuildId(Browser.CHROME, platform, 'stable');
    const { executablePath } = await install({
      browser: Browser.CHROME,
      buildId,
      cacheDir: chromeCacheDir,
    });
    return executablePath;
  } catch (err) {
    const installed = (
      await getInstalledBrowsers({ cacheDir: chromeCacheDir })
    ).filter(({ browser }) => browser === Browser.CHROME);
    if (!installed.length) throw err;

    // Newest downloaded version (build IDs are dotted version numbers)
    const [newest] = installed.sort((a, b) =>
      b.buildId.localeCompare(a.buildId, undefined, { numeric: true }),
    );
    console.warn(
      `⚠️  Lighthouse: couldn't get the latest Chrome (${err.message}) - using Chrome ${newest.buildId}`,
    );
    return newest.executablePath;
  }
}

/**
 * Resolve a request path to a file in `dist/` (pretty URLs: `/about/` -> `/about/index.html`).
 * Returns null if nothing matches or the path escapes `dist/`.
 */
async function resolveFile(urlPath) {
  const filePath = join(distDir, decodeURIComponent(urlPath));
  if (filePath !== distDir && !filePath.startsWith(distDir + sep)) {
    return null;
  }
  for (const candidate of [filePath, join(filePath, 'index.html')]) {
    try {
      if ((await stat(candidate)).isFile()) return candidate;
    } catch {
      // Try the next candidate
    }
  }
  return null;
}

/**
 * Serve `dist/` on a random free port. Resolves with the running server.
 */
function serveDist() {
  const server = createServer(async (req, res) => {
    const { pathname } = new URL(req.url, 'http://localhost');
    let status = 200;
    let file = await resolveFile(pathname);
    if (!file) {
      // Same 404 page Netlify serves (see netlify.toml)
      status = 404;
      file = await resolveFile('/error/404/');
    }
    if (!file) {
      res.writeHead(404).end('Not found');
      return;
    }

    const contentType =
      contentTypes[extname(file).toLowerCase()] || 'application/octet-stream';
    let body = await readFile(file);
    const headers = { 'Content-Type': contentType };
    if (
      compressible.test(contentType) &&
      /\bgzip\b/.test(req.headers['accept-encoding'] || '')
    ) {
      body = gzipSync(body);
      headers['Content-Encoding'] = 'gzip';
    }
    res.writeHead(status, headers).end(body);
  });

  return new Promise((resolveServer) => {
    server.listen(0, '127.0.0.1', () => resolveServer(server));
  });
}

async function main() {
  let server;
  let chrome;
  try {
    console.log('🔦 Lighthouse: preparing Chrome...');
    const chromePath = await getChromePath();

    let url = liveUrl;
    if (!isLive) {
      server = await serveDist();
      url = `http://localhost:${server.address().port}/`;
    }

    chrome = await chromeLauncher.launch({
      chromePath,
      chromeFlags: [
        '--headless=new',
        '--no-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
      ],
    });

    console.log(`🔦 Lighthouse: auditing ${isLive ? liveUrl : 'dist/'}...`);
    const result = await lighthouse(url, {
      port: chrome.port,
      output: 'html',
      logLevel: 'error',
      onlyCategories: Object.keys(thresholds),
    });

    // Save the HTML report
    await mkdir(reportDir, { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportPath = join(
      reportDir,
      `brootaylor-${isLive ? 'live' : 'build'}-${stamp}.html`,
    );
    await writeFile(reportPath, result.report);

    // Check scores against thresholds
    const failures = [];
    console.log(`Lighthouse ${result.lhr.lighthouseVersion} scores:`);
    for (const [id, minScore] of Object.entries(thresholds)) {
      const { title, score } = result.lhr.categories[id];
      const passed = score >= minScore;
      if (!passed) failures.push(title);
      console.log(
        `  ${passed ? '✅' : '⚠️ '} ${title}: ${Math.round(score * 100)} (min ${Math.round(minScore * 100)})`,
      );
    }
    console.log(`📄 Report: ${reportPath}`);

    if (shouldView) {
      const opener = process.platform === 'darwin' ? 'open' : 'xdg-open';
      spawn(opener, [reportPath], { detached: true, stdio: 'ignore' }).unref();
    }

    if (failures.length) {
      console.warn(
        `⚠️  Lighthouse: below threshold - ${failures.join(', ')} (see report; build continues)`,
      );
    } else {
      console.log('✅ Lighthouse: all scores meet their thresholds');
    }
  } finally {
    if (chrome) chrome.kill();
    if (server) server.close();
  }
}

// Never fail the build - Lighthouse results are informational
main().catch((err) => {
  console.warn(
    '⚠️  Lighthouse: audit could not run (build continues):',
    err.message,
  );
});
