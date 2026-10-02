/*
 * Local Netlify build plugin: Lighthouse
 *
 * Runs the Lighthouse audit (`config/lighthouse.mjs`) on `dist/` after the build,
 * then sends the scores to the Netlify UI (deploy summary) using the same
 * data format as the official `@netlify/plugin-lighthouse`.
 *
 * Informational only - it never fails the build. If the audit can't run,
 * a warning is logged and shown in the deploy summary instead.
 * Registered in `netlify.toml` under [[plugins]].
 */

import { minify } from 'html-minifier-terser';
import { runAudit } from '../../../config/lighthouse.mjs';

export const onPostBuild = async ({ utils }) => {
  try {
    const { label, categories, report, details } = await runAudit();

    const shortSummary = categories
      .map(({ title, score }) => `${title}: ${Math.round(score * 100)}`)
      .join(', ');

    // Scores keyed by category id (0-100), as the Netlify UI expects
    const scores = Object.fromEntries(
      categories.map(({ id, score }) => [id, Math.round(score * 100)]),
    );

    // Minified to keep the payload sent to Netlify small
    const minifiedReport = await minify(report, {
      removeAttributeQuotes: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      removeOptionalTags: true,
      removeEmptyElements: true,
      minifyCSS: true,
      minifyJS: true,
    });

    utils.status.show({
      summary: `Summary for path '${label}': ${shortSummary}`,
      extraData: [
        { path: label, summary: scores, details, report: minifiedReport },
      ],
    });
  } catch (err) {
    // Never fail the build - Lighthouse results are informational
    console.warn(
      '⚠️  Lighthouse: audit could not run (build continues):',
      err.message,
    );
    utils.status.show({
      summary: `Lighthouse audit could not run: ${err.message}`,
    });
  }
};
