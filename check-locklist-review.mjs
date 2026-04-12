// check-locklist-review.mjs
//
// Build-time freshness check for .known-bad.locklist.
//
// Purpose:
//   Warn when the denylist has not been reviewed recently enough.
//   This helps prevent a "set and forget" security control.
//
// Behavior:
//   - warning only
//   - never fails the build
//   - exit code is always 0
//
// Expected metadata line inside .known-bad.locklist:
//   # LAST-REVIEWED: YYYY-MM-DD

import fs from 'node:fs';

const MAX_DAYS = 7;
const FILE = '.known-bad.locklist';

/**
 * Parse a YYYY-MM-DD string as a UTC calendar date and validate it strictly.
 *
 * Why not just do:
 *   new Date("2026-04-02T00:00:00Z")
 *
 * Because JavaScript Date parsing will happily roll invalid dates forward
 * (for example, some invalid month/day combinations), which can turn a bad
 * metadata value into a misleadingly "valid" one.
 *
 * This function parses explicitly and then round-trips back to YYYY-MM-DD
 * to ensure the original date is real.
 *
 * Returns:
 *   - UTC milliseconds for midnight on that date
 *   - null if invalid
 */
function parseIsoDateUtc(dateStr) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const ms = Date.UTC(year, month - 1, day);
  const roundTrip = new Date(ms).toISOString().slice(0, 10);

  return roundTrip === dateStr ? ms : null;
}

if (!fs.existsSync(FILE)) {
  console.warn(`⚠️  ${FILE} not found — skipping review-age check`);
  process.exit(0);
}

const text = fs.readFileSync(FILE, 'utf8');

// Find the metadata line anywhere in the file.
// The comment marker is required so the field stays valid inside the locklist.
const match = text.match(/^\s*#\s*LAST-REVIEWED:\s*(\d{4}-\d{2}-\d{2})\s*$/m);

if (!match) {
  console.warn(`⚠️  Missing "# LAST-REVIEWED: YYYY-MM-DD" in ${FILE}`);
  process.exit(0);
}

const dateStr = match[1];
const reviewedMs = parseIsoDateUtc(dateStr);

if (reviewedMs === null) {
  console.warn(`⚠️  Invalid LAST-REVIEWED date in ${FILE}: ${dateStr}`);
  process.exit(0);
}

// Compare using UTC calendar days so the result is stable across timezones
// and times of day.
const now = new Date();
const todayUtcMs = Date.UTC(
  now.getUTCFullYear(),
  now.getUTCMonth(),
  now.getUTCDate()
);

const ageDays = Math.floor((todayUtcMs - reviewedMs) / 86400000);

// A future review date is probably a typo and should be surfaced clearly.
if (ageDays < 0) {
  console.warn(
    `⚠️  LAST-REVIEWED in ${FILE} is in the future (${dateStr}). Please correct it.`
  );
  process.exit(0);
}

if (ageDays > MAX_DAYS) {
  console.warn(
    `NETLIFY NOTICE: Locklist review is stale (${ageDays} days old).\n` +
    `Please review and update LAST-REVIEWED in ${FILE}.`
  );
} else {
  console.log(`ℹ️  Locklist review OK (${ageDays} days old).`);
}

// Warning-only script: never block the build.
process.exit(0);
