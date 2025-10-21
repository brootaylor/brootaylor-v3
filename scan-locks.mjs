// scan-locks.mjs — NPM-only lockfile scan (npm v1 and v2+), ESM, no deps
// Usage: `node scan-locks.mjs`

import fs from 'node:fs'; // filesystem
import path from 'node:path'; // path utils

const ROOT = process.cwd(); // project root
const LIST_FILES = ['.known-bad.locklist', '.known-bad.locklist.local']; // files with known-bad entries. `.local` is gitignored.
const KNOWN_BAD = new Set();

// 1) Load lists of known-bad entries
for (const fname of LIST_FILES) {
  const p = path.join(ROOT, fname);
  if (!fs.existsSync(p)) continue;
  const lines = fs
    .readFileSync(p, 'utf8')
    .split(/\r?\n/)
    .map(s => s.trim())
    .filter(s => s && !s.startsWith('#'));
  for (const line of lines) KNOWN_BAD.add(line);
}

// Allow bypassing the scan via env var.
// eg `BYPASS_LOCK_SCAN=1 npm run netlify-build`
if (process.env.BYPASS_LOCK_SCAN === '1') {
  console.log('⚠️  Skipping lockfile scan because BYPASS_LOCK_SCAN=1');
  process.exit(0);
}

// Nothing to check? Exit early.
if (KNOWN_BAD.size === 0) {
  console.log('ℹ️  No known-bad entries found (.known-bad.locklist empty or missing). Nothing to check.');
  process.exit(0);
}

// 2) Find npm lockfiles only
const IGNORES = new Set([
  'node_modules','.git','dist','build','.next','.cache','coverage',
  '.pnpm-store','.turbo','.output','.vercel','.sst','.serverless'
]);

// Recursive directory walker generator for lockfiles
function *walk(dir) {
  for (const d of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORES.has(d.name)) continue;
    const p = path.join(dir, d.name);
    if (d.isDirectory()) yield* walk(p);
    else if (d.isFile()) {
      const bn = path.basename(p);
      if (bn === 'package-lock.json' || bn === 'npm-shrinkwrap.json') yield p;
    }
  }
}

// 3) Scan npm v1 + v2+ lock formats
const hits = []; // { lockPath, key, path }
const rel = p => path.relative(ROOT, p); // relative path helper
const addHit = (lockPath, key, where) => hits.push({ lockPath: rel(lockPath), key, path: where }); // record a hit

// Scan a parsed npm lockfile object
function scanNpmLock(lock, lockPath) {
  // helper: derive package name from a "packages" key path
  const nameFromPath = (pkgPath) => {
    if (!pkgPath) return null; // root entry ""
    // grab the last .../node_modules/<name> (supports scopes)
    const m = pkgPath.match(/node_modules\/(@[^/]+\/[^/]+|[^/]+)$/);
    return m ? m[1] : null;
  };

  // npm v2/v3 (npm 7+): "packages"
  if (lock && typeof lock === 'object' && lock.packages && typeof lock.packages === 'object') {
    for (const [pkgPath, meta] of Object.entries(lock.packages)) {
      const name = meta?.name || nameFromPath(pkgPath);
      const ver  = meta?.version;
      if (!name || !ver) continue;
      const key = `${name}@${ver}`;
      if (KNOWN_BAD.has(key)) addHit(lockPath, key, pkgPath || '.');
    }
  }

  // npm v1: "dependencies" (keep the fallback to meta.from)
  const walkDeps = (deps, trail = []) => {
    if (!deps) return;
    for (const [name, meta] of Object.entries(deps)) {
      const ver =
        meta?.version ||
        (typeof meta?.from === 'string' ? meta.from.split('@').pop() : undefined);
      if (ver) {
        const key = `${name}@${ver}`;
        if (KNOWN_BAD.has(key)) addHit(lockPath, key, trail.concat(name).join(' > ') || '.');
      }
      if (meta?.dependencies) walkDeps(meta.dependencies, trail.concat(name));
    }
  };
  walkDeps(lock?.dependencies);
}

// 4) Run
let foundAnyLock = false;
for (const lockPath of walk(ROOT)) {
  foundAnyLock = true;
  try {
    const lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
    scanNpmLock(lock, lockPath);
  } catch (e) {
    console.error(`Error scanning ${rel(lockPath)}: ${e.message}`);
  }
}

// No lockfiles found at all?
if (!foundAnyLock) {
  console.log('ℹ️  No npm lockfiles found (package-lock.json / npm-shrinkwrap.json).');
  process.exit(0);
}

// 5) Report
if (hits.length) {
  console.log('⚠️  Suspicious lockfile matches:');
  for (const h of hits) console.log(` - ${h.key}  in ${h.lockPath}  (${h.path})`);
  process.exit(1);
} else {
  console.log('✅ No matches to the known-bad list in any detected lockfile');
}
