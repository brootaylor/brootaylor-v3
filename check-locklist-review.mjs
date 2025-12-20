// check-locklist-review.mjs
// Warns if .known-bad.locklist LAST-REVIEWED is older than MAX_DAYS
// Does NOT fail builds (exit code always 0)

import fs from "node:fs";

const MAX_DAYS = 7;
const FILE = ".known-bad.locklist";

if (!fs.existsSync(FILE)) {
  console.warn(`⚠️  ${FILE} not found — skipping review-age check`);
  process.exit(0);
}

const text = fs.readFileSync(FILE, "utf8");

const match = text.match(/^\s*#\s*LAST-REVIEWED:\s*(\d{4}-\d{2}-\d{2})\s*$/m);
if (!match) {
  console.warn(`⚠️  Missing "# LAST-REVIEWED: YYYY-MM-DD" in ${FILE}`);
  process.exit(0);
}

const lastReviewed = new Date(`${match[1]}T00:00:00Z`);
const now = new Date();
const ageDays = Math.floor((now - lastReviewed) / (1000 * 60 * 60 * 24));

if (ageDays > MAX_DAYS) {
  console.warn(
    `NETLIFY NOTICE: Locklist review is stale (${ageDays} days old).\n` +
    `Please review and update LAST-REVIEWED in ${FILE}.`
  );
} else {
  console.log(`ℹ️  Locklist review OK (${ageDays} days old).`);
}

// Warning-only: never block the build
process.exit(0);
