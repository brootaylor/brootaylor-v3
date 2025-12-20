// scan-locks.mjs — NPM-only lockfile scan (npm v1 and v2+), ESM, no deps
//
// Usage:
//   node scan-locks.mjs
//   node scan-locks.mjs --json
//   node scan-locks.mjs --explain
//   node scan-locks.mjs --json --explain
//
// Known-bad list formats supported (one per line):
//   1) Exact version:          name@1.2.3
//   2) Any version (wildcard): name@*
//   3) Any version (bare):     name
//   4) Exact + integrity:      name@1.2.3#sha512-...
//
// Explain mode:
// - If your locklist includes nearby comment metadata lines starting with:
//     WHY:, REF:, TAGS:, POLICY:
//   then --explain prints them under each match.
//
// Notes:
// - Integrity checks apply primarily to npm v2/v3 lockfile "packages" entries,
//   where meta.integrity is commonly present.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const LIST_FILES = ['.known-bad.locklist', '.known-bad.locklist.local'];

// CLI flags
const ARGS = new Set(process.argv.slice(2));
const AS_JSON = ARGS.has('--json');
const EXPLAIN = ARGS.has('--explain');

function printJson(obj) {
  console.log(JSON.stringify(obj, null, 2));
}

function netlifySummaryLine(text) {
  // A deliberately grep-friendly line for CI logs
  console.log(`NETLIFY SUMMARY: ${text}`);
}

// Allow bypassing the scan via env var.
// eg `BYPASS_LOCK_SCAN=1 npm run netlify-build`
if (process.env.BYPASS_LOCK_SCAN === '1') {
  const summary = 'Lockfile scan skipped (BYPASS_LOCK_SCAN=1)';
  if (AS_JSON) {
    printJson({ ok: true, skipped: true, reason: 'BYPASS_LOCK_SCAN=1', summary });
  } else {
    console.log('⚠️  Skipping lockfile scan because BYPASS_LOCK_SCAN=1');
    netlifySummaryLine(summary);
  }
  process.exit(0);
}

// Known-bad registries
const KNOWN_BAD_EXACT = new Set();        // "name@version"
const KNOWN_BAD_ANYVER = new Set();       // "name"
const KNOWN_BAD_INTEGRITY = new Set();    // "name@version#integrity"

// Optional "why" metadata captured from nearby comments
// key -> array of comment lines (strings)
const WHY = new Map();

// 1) Load lists of known-bad entries
for (const fname of LIST_FILES) {
  const p = path.join(ROOT, fname);
  if (!fs.existsSync(p)) continue;

  const rawLines = fs.readFileSync(p, 'utf8').split(/\r?\n/);

  // Track the most recent contiguous comment block (for WHY metadata)
  // Any blank line resets it.
  let commentBlock = [];

  for (const raw of rawLines) {
    const line = raw.trim();

    // Blank line resets context
    if (!line) {
      commentBlock = [];
      continue;
    }

    // Comment line: store as context and continue
    if (line.startsWith('#')) {
      commentBlock.push(line.replace(/^#\s?/, '')); // strip "# " or "#"
      continue;
    }

    // Non-comment entry line
    const entry = line;

    // Attach meaningful metadata to a key (if present)
    const attachWhy = (key) => {
      if (!commentBlock.length) return;

      // Only keep “structured” metadata lines
      const meaningful = commentBlock.filter((s) => {
        const t = s.toLowerCase();
        return t.startsWith('why:') || t.startsWith('ref:') || t.startsWith('tags:') || t.startsWith('policy:');
      });

      if (!meaningful.length) return;
      WHY.set(key, meaningful);
    };

    // Integrity form: name@ver#sha512-...
    if (entry.includes('#')) {
      const [left, integrityRaw] = entry.split('#');
      const integrity = (integrityRaw || '').trim();
      const keyLeft = (left || '').trim();
      if (keyLeft && integrity) {
        const key = `${keyLeft}#${integrity}`;
        KNOWN_BAD_INTEGRITY.add(key);
        attachWhy(key);
      }
      continue;
    }

    // Any-version forms
    if (entry.endsWith('@*')) {
      const name = entry.slice(0, -2).trim();
      if (name) {
        KNOWN_BAD_ANYVER.add(name);
        attachWhy(name);
      }
      continue;
    }
    if (!entry.includes('@')) {
      KNOWN_BAD_ANYVER.add(entry);
      attachWhy(entry);
      continue;
    }

    // Exact version form: name@ver
    KNOWN_BAD_EXACT.add(entry);
    attachWhy(entry);
  }
}

// Nothing to check? Exit early.
if (KNOWN_BAD_EXACT.size === 0 && KNOWN_BAD_ANYVER.size === 0 && KNOWN_BAD_INTEGRITY.size === 0) {
  const summary = 'No known-bad entries configured (nothing to scan)';
  if (AS_JSON) {
    printJson({ ok: true, reason: 'no-known-bad-entries', summary, hits: [] });
  } else {
    console.log('ℹ️  No known-bad entries found (.known-bad.locklist empty or missing). Nothing to check.');
    netlifySummaryLine(summary);
  }
  process.exit(0);
}

// 2) Find npm lockfiles only
const IGNORES = new Set([
  'node_modules', '.git', 'dist', 'build', '.next', '.cache', 'coverage',
  '.pnpm-store', '.turbo', '.output', '.vercel', '.sst', '.serverless',
]);

function* walk(dir) {
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
// hits: { lockPath, key, path, reason, why }
const hits = [];
const rel = (p) => path.relative(ROOT, p);
const addHit = (lockPath, key, where, reason) =>
  hits.push({
    lockPath: rel(lockPath),
    key,
    path: where,
    reason,
    why: WHY.get(key) || null,
  });

function isKnownBad(name, ver, integrity) {
  if (!name) return null;

  // any-version blocks
  if (KNOWN_BAD_ANYVER.has(name)) return { reason: 'any-version-block', key: name };

  // exact blocks + integrity blocks
  if (ver) {
    const exactKey = `${name}@${ver}`;
    if (KNOWN_BAD_EXACT.has(exactKey)) return { reason: 'exact-version-block', key: exactKey };

    if (integrity) {
      const integKey = `${exactKey}#${integrity}`;
      if (KNOWN_BAD_INTEGRITY.has(integKey)) return { reason: 'integrity-block', key: integKey };
    }
  }

  return null;
}

// Scan a parsed npm lockfile object
function scanNpmLock(lock, lockPath) {
  // helper: derive package name from a "packages" key path
  const nameFromPath = (pkgPath) => {
    if (!pkgPath) return null; // root entry ""
    const m = pkgPath.match(/node_modules\/(@[^/]+\/[^/]+|[^/]+)$/);
    return m ? m[1] : null;
  };

  // npm v2/v3 (npm 7+): "packages"
  if (lock && typeof lock === 'object' && lock.packages && typeof lock.packages === 'object') {
    for (const [pkgPath, meta] of Object.entries(lock.packages)) {
      const name = meta?.name || nameFromPath(pkgPath);
      const ver = meta?.version;
      const integrity = meta?.integrity;
      if (!name) continue;

      const hit = isKnownBad(name, ver, integrity);
      if (hit) addHit(lockPath, hit.key, pkgPath || '.', hit.reason);
    }
  }

  // npm v1: "dependencies" (fallback to meta.from) + recursive tree
  const walkDeps = (deps, trail = []) => {
    if (!deps) return;
    for (const [name, meta] of Object.entries(deps)) {
      const ver =
        meta?.version ||
        (typeof meta?.from === 'string' ? meta.from.split('@').pop() : undefined);

      const hit = isKnownBad(name, ver, meta?.integrity);
      if (hit) addHit(lockPath, hit.key, trail.concat(name).join(' > ') || '.', hit.reason);

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
    const errMsg = `Error scanning ${rel(lockPath)}: ${e.message}`;
    const summary = 'Lockfile scan error (unable to parse one or more lockfiles)';
    if (AS_JSON) {
      printJson({ ok: false, error: errMsg, summary });
    } else {
      console.error(errMsg);
      netlifySummaryLine(summary);
    }
  }
}

// No lockfiles found at all?
if (!foundAnyLock) {
  const summary = 'No npm lockfiles found (package-lock.json / npm-shrinkwrap.json)';
  if (AS_JSON) {
    printJson({ ok: true, reason: 'no-lockfiles-found', summary, hits: [] });
  } else {
    console.log('ℹ️  No npm lockfiles found (package-lock.json / npm-shrinkwrap.json).');
    netlifySummaryLine(summary);
  }
  process.exit(0);
}

// 5) Report
if (hits.length) {
  const summary = `Lockfile scan FAILED (${hits.length} match${hits.length === 1 ? '' : 'es'})`;
  if (AS_JSON) {
    printJson({ ok: false, summary, hits });
  } else {
    console.log('⚠️  Suspicious lockfile matches:');
    for (const h of hits) {
      console.log(` - ${h.key}  in ${h.lockPath}  (${h.path})  [${h.reason}]`);
      if (EXPLAIN && h.why) {
        for (const line of h.why) console.log(`     ${line}`);
      }
    }
    netlifySummaryLine(summary);
  }
  process.exit(1);
} else {
  const summary = 'Lockfile scan passed (no known-bad matches)';
  if (AS_JSON) {
    printJson({ ok: true, summary, hits: [] });
  } else {
    console.log('✅ No matches to the known-bad list in any detected lockfile');
    netlifySummaryLine(summary);
  }
}
