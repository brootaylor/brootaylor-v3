// scan-locks.mjs
//
// Build-time scanner for npm lockfiles only.
// It looks for dependencies that match a local "known bad" denylist and
// fails the build if any are found.
//
// Supported lockfiles:
//   - package-lock.json
//   - npm-shrinkwrap.json
//
// Supported npm lockfile formats:
//   - npm v1 ("dependencies" tree)
//   - npm v2/v3 ("packages" map)
//
// Usage:
//   node scan-locks.mjs
//   node scan-locks.mjs --json
//   node scan-locks.mjs --explain
//   node scan-locks.mjs --json --explain
//
// Supported locklist entry formats (one per line):
//   1) Exact version block:
//        package@1.2.3
//
//   2) Any-version block:
//        package@*
//        package
//        @scope/package
//
//   3) Exact package version + exact artifact integrity block:
//        package@1.2.3#sha512-...
//
// Explain mode:
//   If comment lines immediately above an entry include metadata lines
//   beginning with WHY:, REF:, TAGS:, or POLICY:, those lines are attached
//   to the matching entry and shown when --explain is used.
//
// Design notes:
//   - Security controls should fail closed where practical.
//   - Malformed denylist entries are treated as configuration errors.
//   - Unparseable lockfiles also fail the scan.
//   - npm v2/v3 lockfiles are scanned using only "packages" to avoid
//     duplicate reporting from the compatibility "dependencies" section.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const LIST_FILES = ['.known-bad.locklist', '.known-bad.locklist.local'];

// CLI flags.
// --json    => machine-readable output
// --explain => include WHY/REF/TAGS/POLICY metadata for matches
const ARGS = new Set(process.argv.slice(2));
const AS_JSON = ARGS.has('--json');
const EXPLAIN = ARGS.has('--explain');

// Directories that should not be traversed while searching for lockfiles.
// These are either generated output, caches, or places where recursive
// scanning would be wasteful/noisy.
const IGNORES = new Set([
  'node_modules',
  '.git',
  'dist',
  'build',
  '.next',
  '.cache',
  'coverage',
  '.pnpm-store',
  '.turbo',
  '.output',
  '.vercel',
  '.sst',
  '.serverless',
]);

// In-memory registries built from the denylist files.
//
// KNOWN_BAD_EXACT:
//   Exact package/version matches, e.g. "axios@1.2.3"
//
// KNOWN_BAD_ANYVER:
//   Fail-closed package name blocks, e.g. "axios" or "@scope/pkg"
//
// KNOWN_BAD_INTEGRITY:
//   Exact package/version/artifact matches, e.g.
//   "axios@1.2.3#sha512-..."
//
// WHY:
//   Optional structured metadata captured from nearby comment blocks.
//   key -> array of strings like ["WHY: ...", "REF: ..."]
const KNOWN_BAD_EXACT = new Set();
const KNOWN_BAD_ANYVER = new Set();
const KNOWN_BAD_INTEGRITY = new Set();
const WHY = new Map();

// Configuration errors found while parsing the denylist.
// We collect them all first so a single run can report every bad line.
const CONFIG_ERRORS = [];

/**
 * Emit pretty JSON for CI or machine parsing.
 */
function printJson(obj) {
  console.log(JSON.stringify(obj, null, 2));
}

/**
 * Print one grep-friendly summary line for CI logs.
 * This makes the high-level result easy to spot in long build output.
 */
function netlifySummaryLine(text) {
  console.log(`NETLIFY SUMMARY: ${text}`);
}

/**
 * Convert an absolute path to a path relative to the repo root.
 * Relative paths are easier to read in CI logs and JSON output.
 */
function rel(p) {
  return path.relative(ROOT, p);
}

/**
 * Normalize integrity strings before matching.
 * Right now this is just trim(), but keeping it centralized makes later
 * normalization changes easier.
 */
function normalizeIntegrity(value) {
  return typeof value === 'string' ? value.trim() : '';
}

/**
 * Attach nearby structured comment metadata to a denylist key.
 *
 * Only comment lines starting with WHY:, REF:, TAGS:, or POLICY:
 * are preserved. General comments are ignored for explain output so
 * the output stays focused and predictable.
 */
function attachWhy(key, commentBlock) {
  if (!commentBlock.length) return;

  const meaningful = commentBlock.filter((s) => {
    const t = s.toLowerCase();
    return (
      t.startsWith('why:') ||
      t.startsWith('ref:') ||
      t.startsWith('tags:') ||
      t.startsWith('policy:')
    );
  });

  if (meaningful.length) WHY.set(key, meaningful);
}

/**
 * Parse one denylist line into a normalized entry.
 *
 * Returns:
 *   { kind: 'any', key: 'name' }
 *   { kind: 'exact', key: 'name@version' }
 *   { kind: 'integrity', key: 'name@version#sha512-...' }
 *
 * Important edge case:
 *   Scoped bare package names like "@scope/pkg" must be treated as
 *   any-version blocks, not mistaken for "name@version".
 */
function parseKnownBadEntry(entry) {
  const trimmed = entry.trim();
  if (!trimmed) return null;

  // Integrity-qualified entry:
  //   package@1.2.3#sha512-...
  //
  // We first split on "#" and then re-parse the left side to ensure
  // it is a valid exact package@version entry.
  const hashIndex = trimmed.indexOf('#');
  if (hashIndex !== -1) {
    const left = trimmed.slice(0, hashIndex).trim();
    const integrity = trimmed.slice(hashIndex + 1).trim();

    if (!left || !integrity) {
      throw new Error(`invalid integrity entry: "${trimmed}"`);
    }

    const parsedLeft = parseKnownBadEntry(left);
    if (!parsedLeft || parsedLeft.kind !== 'exact') {
      throw new Error(`integrity entry must be "name@version#integrity": "${trimmed}"`);
    }

    return {
      kind: 'integrity',
      key: `${parsedLeft.key}#${integrity}`,
    };
  }

  // Any-version wildcard form:
  //   package@*
  if (trimmed.endsWith('@*')) {
    const name = trimmed.slice(0, -2).trim();
    if (!name) {
      throw new Error(`invalid wildcard entry: "${trimmed}"`);
    }
    return { kind: 'any', key: name };
  }

  // Distinguish between:
  //   bare unscoped name      => "lodash"
  //   bare scoped name        => "@scope/pkg"
  //   exact package@version   => "lodash@4.17.21" / "@scope/pkg@1.2.3"
  //
  // Using lastIndexOf("@") handles scoped names correctly:
  //   "@scope/pkg"       -> lastAt === 0 => bare package => any-version
  //   "@scope/pkg@1.2.3" -> lastAt > 0   => exact version
  const lastAt = trimmed.lastIndexOf('@');

  if (lastAt <= 0) {
    return { kind: 'any', key: trimmed };
  }

  const name = trimmed.slice(0, lastAt).trim();
  const version = trimmed.slice(lastAt + 1).trim();

  if (!name || !version) {
    throw new Error(`invalid exact entry: "${trimmed}"`);
  }

  return { kind: 'exact', key: `${name}@${version}` };
}

/**
 * Load all configured denylist files and populate the in-memory registries.
 *
 * Parsing behavior:
 *   - blank lines reset comment metadata context
 *   - comment lines accumulate as context for the next real entry
 *   - malformed entries are collected as configuration errors
 */
function loadKnownBadLists() {
  for (const fname of LIST_FILES) {
    const fullPath = path.join(ROOT, fname);
    if (!fs.existsSync(fullPath)) continue;

    const lines = fs.readFileSync(fullPath, 'utf8').split(/\r?\n/);
    let commentBlock = [];

    for (let i = 0; i < lines.length; i += 1) {
      const raw = lines[i];
      const line = raw.trim();

      // Blank lines break the association between one comment block
      // and subsequent entries.
      if (!line) {
        commentBlock = [];
        continue;
      }

      // Keep comment text as context for the next entry.
      if (line.startsWith('#')) {
        commentBlock.push(line.replace(/^#\s?/, ''));
        continue;
      }

      try {
        const parsed = parseKnownBadEntry(line);
        if (!parsed) continue;

        if (parsed.kind === 'any') {
          KNOWN_BAD_ANYVER.add(parsed.key);
        } else if (parsed.kind === 'exact') {
          KNOWN_BAD_EXACT.add(parsed.key);
        } else if (parsed.kind === 'integrity') {
          KNOWN_BAD_INTEGRITY.add(parsed.key);
        }

        attachWhy(parsed.key, commentBlock);
      } catch (error) {
        CONFIG_ERRORS.push(`${fname}:${i + 1}: ${error.message}`);
      }
    }
  }
}

/**
 * Recursively walk the repo and yield npm lockfiles.
 *
 * We deliberately do not scan non-npm lockfiles here. This keeps the scope
 * of the script narrow and avoids false assumptions about other ecosystems.
 */
function* walk(dir) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });

  for (const d of dirents) {
    if (IGNORES.has(d.name)) continue;

    const fullPath = path.join(dir, d.name);

    if (d.isDirectory()) {
      yield* walk(fullPath);
      continue;
    }

    if (!d.isFile()) continue;

    const base = path.basename(fullPath);
    if (base === 'package-lock.json' || base === 'npm-shrinkwrap.json') {
      yield fullPath;
    }
  }
}

/**
 * Derive a package name from an npm v2/v3 "packages" object key.
 *
 * Example:
 *   "node_modules/chalk" -> "chalk"
 *   "node_modules/@scope/pkg" -> "@scope/pkg"
 *
 * We only want the final package segment, not the full nested path.
 */
function nameFromPackagePath(pkgPath) {
  if (!pkgPath) return null;
  const match = pkgPath.match(/node_modules\/(@[^/]+\/[^/]+|[^/]+)$/);
  return match ? match[1] : null;
}

/**
 * Check whether a package instance matches the denylist.
 *
 * Match order:
 *   1) fail-closed any-version package block
 *   2) exact package@version block
 *   3) exact package@version#integrity block
 *
 * Return shape:
 *   null
 *   { reason, key }
 */
function isKnownBad(name, version, integrity) {
  if (!name) return null;

  // A package-level fail-closed block always wins, even if we do not know
  // the exact version.
  if (KNOWN_BAD_ANYVER.has(name)) {
    return { reason: 'any-version-block', key: name };
  }

  // Exact version and integrity matching require a version.
  if (!version) return null;

  const exactKey = `${name}@${version}`;
  if (KNOWN_BAD_EXACT.has(exactKey)) {
    return { reason: 'exact-version-block', key: exactKey };
  }

  const normalizedIntegrity = normalizeIntegrity(integrity);
  if (normalizedIntegrity) {
    const integrityKey = `${exactKey}#${normalizedIntegrity}`;
    if (KNOWN_BAD_INTEGRITY.has(integrityKey)) {
      return { reason: 'integrity-block', key: integrityKey };
    }
  }

  return null;
}

/**
 * Scan one parsed npm lockfile.
 *
 * npm v2/v3:
 *   Prefer the top-level "packages" map only. npm keeps a compatibility
 *   "dependencies" section as well, but scanning both would create
 *   duplicate or misleading matches.
 *
 * npm v1:
 *   Traverse the nested "dependencies" tree recursively.
 */
function scanNpmLock(lock, lockPath, addHit) {
  if (
    lock &&
    typeof lock === 'object' &&
    lock.packages &&
    typeof lock.packages === 'object'
  ) {
    for (const [pkgPath, meta] of Object.entries(lock.packages)) {
      // The empty-string key represents the root project itself.
      // We do not treat the application/package being built as a dependency hit.
      if (pkgPath === '') continue;

      const name = typeof meta?.name === 'string' ? meta.name : nameFromPackagePath(pkgPath);
      const version = typeof meta?.version === 'string' ? meta.version : undefined;
      const integrity = typeof meta?.integrity === 'string' ? meta.integrity : undefined;

      if (!name) continue;

      const hit = isKnownBad(name, version, integrity);
      if (hit) {
        addHit(lockPath, hit.key, pkgPath, hit.reason);
      }
    }
    return;
  }

  /**
   * Recursive walker for npm v1 lockfiles.
   *
   * trail is used only for reporting, so the CI output makes clear where
   * in the dependency tree the hit was found.
   */
  function walkDeps(deps, trail = []) {
    if (!deps || typeof deps !== 'object') return;

    for (const [name, meta] of Object.entries(deps)) {
      const version = typeof meta?.version === 'string' ? meta.version : undefined;
      const integrity = typeof meta?.integrity === 'string' ? meta.integrity : undefined;

      const hit = isKnownBad(name, version, integrity);
      if (hit) {
        addHit(lockPath, hit.key, trail.concat(name).join(' > '), hit.reason);
      }

      if (meta?.dependencies && typeof meta.dependencies === 'object') {
        walkDeps(meta.dependencies, trail.concat(name));
      }
    }
  }

  walkDeps(lock?.dependencies);
}

/**
 * Main entry point.
 */
function main() {
  // Emergency override for situations where the scan must be bypassed.
  // This is intentionally explicit and visible in output.
  if (process.env.BYPASS_LOCK_SCAN === '1') {
    const summary = 'Lockfile scan skipped (BYPASS_LOCK_SCAN=1)';
    if (AS_JSON) {
      printJson({
        ok: true,
        skipped: true,
        reason: 'BYPASS_LOCK_SCAN=1',
        summary,
      });
    } else {
      console.log('⚠️  Skipping lockfile scan because BYPASS_LOCK_SCAN=1');
      netlifySummaryLine(summary);
    }
    process.exit(0);
  }

  loadKnownBadLists();

  // Treat denylist parse errors as fatal. A security denylist that cannot be
  // parsed reliably should not silently degrade into partial protection.
  if (CONFIG_ERRORS.length > 0) {
    const summary = `Known-bad list parse FAILED (${CONFIG_ERRORS.length} error${CONFIG_ERRORS.length === 1 ? '' : 's'})`;
    const hits = CONFIG_ERRORS.map((msg) => ({
      lockPath: '.known-bad.locklist',
      key: 'INVALID_LOCKLIST_ENTRY',
      path: '.',
      reason: 'known-bad-list-parse-error',
      why: [msg],
    }));

    if (AS_JSON) {
      printJson({ ok: false, summary, hits });
    } else {
      console.log('⚠️  Invalid known-bad list entries:');
      for (const hit of hits) {
        console.log(` - ${hit.key}  (${hit.reason})`);
        for (const line of hit.why) {
          console.log(`     ${line}`);
        }
      }
      netlifySummaryLine(summary);
    }
    process.exit(1);
  }

  // A missing or empty denylist is not a scan failure, but it is worth
  // reporting clearly because the scan has nothing meaningful to enforce.
  if (
    KNOWN_BAD_EXACT.size === 0 &&
    KNOWN_BAD_ANYVER.size === 0 &&
    KNOWN_BAD_INTEGRITY.size === 0
  ) {
    const summary = 'No known-bad entries configured (nothing to scan)';
    if (AS_JSON) {
      printJson({ ok: true, reason: 'no-known-bad-entries', summary, hits: [] });
    } else {
      console.log('ℹ️  No known-bad entries found (.known-bad.locklist empty or missing). Nothing to check.');
      netlifySummaryLine(summary);
    }
    process.exit(0);
  }

  // Gather lockfiles deterministically so repeated runs produce stable ordering.
  const lockfiles = Array.from(walk(ROOT)).sort();

  const hits = [];
  const seen = new Set();

  /**
   * Record one match, de-duplicating exact duplicates.
   *
   * De-duplication matters because different traversal paths or odd lockfile
   * structures can otherwise produce repeated identical findings.
   */
  function addHit(lockPath, key, where, reason) {
    const recordKey = `${rel(lockPath)}\u0000${key}\u0000${where}\u0000${reason}`;
    if (seen.has(recordKey)) return;
    seen.add(recordKey);

    hits.push({
      lockPath: rel(lockPath),
      key,
      path: where || '.',
      reason,
      why: WHY.get(key) || null,
    });
  }

  if (lockfiles.length === 0) {
    const summary = 'No npm lockfiles found (package-lock.json / npm-shrinkwrap.json)';
    if (AS_JSON) {
      printJson({ ok: true, reason: 'no-lockfiles-found', summary, hits: [] });
    } else {
      console.log('ℹ️  No npm lockfiles found (package-lock.json / npm-shrinkwrap.json).');
      netlifySummaryLine(summary);
    }
    process.exit(0);
  }

  // Parse and scan each discovered lockfile.
  // A JSON parse failure is treated as a scan failure rather than ignored.
  for (const lockPath of lockfiles) {
    try {
      const raw = fs.readFileSync(lockPath, 'utf8');
      const lock = JSON.parse(raw);
      scanNpmLock(lock, lockPath, addHit);
    } catch (error) {
      addHit(lockPath, 'UNPARSEABLE_LOCKFILE', '.', 'json-parse-error');
      const last = hits[hits.length - 1];
      last.why = [`Error scanning ${rel(lockPath)}: ${error.message}`];
    }
  }

  if (hits.length > 0) {
    const summary = `Lockfile scan FAILED (${hits.length} match${hits.length === 1 ? '' : 'es'})`;

    if (AS_JSON) {
      printJson({ ok: false, summary, hits });
    } else {
      console.log('⚠️  Suspicious lockfile matches:');
      for (const h of hits) {
        console.log(` - ${h.key}  in ${h.lockPath}  (${h.path})  [${h.reason}]`);
        if (EXPLAIN && h.why) {
          for (const line of h.why) {
            console.log(`     ${line}`);
          }
        }
      }
      netlifySummaryLine(summary);
    }
    process.exit(1);
  }

  const summary = 'Lockfile scan passed (no known-bad matches)';
  if (AS_JSON) {
    printJson({ ok: true, summary, hits: [] });
  } else {
    console.log('✅ No matches to the known-bad list in any detected lockfile');
    netlifySummaryLine(summary);
  }
}

main();
