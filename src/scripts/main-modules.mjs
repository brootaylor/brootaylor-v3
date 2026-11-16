/**
 * Dynamic module loading
 *
 * This is the site's only JavaScript entry point. All scripts live in module files like this one
 * (there are no inline `<script>` blocks), so the Content Security Policy in `netlify.toml` can
 * allow scripts from this site only (`script-src 'self'`).
 *
 * Module scripts are deferred, so this runs once the HTML has been fully parsed, before `DOMContentLoaded`.
 */

import { version, name } from '../../package.json';

// Static imports: Rollup copies these straight into `main.mjs`, so they don't cost an extra request.
// They're small and needed on every page.
import addHoneypotLink from './features/honeypot.mjs';
import registerServiceWorker from './features/serviceWorker.mjs';

const versionPrintOut = `${name}.${version}`;
console.info(versionPrintOut);

// Features switched on in `_data/site.js`. `base.njk` passes them on as `data-` attributes on `<html>`.
const rootElement = document.documentElement;

// Hidden link that catches scraper bots (see ./features/honeypot.mjs)
if (rootElement.hasAttribute('data-honeypot')) {
  addHoneypotLink();
}

// Offline support. Only switched on for production builds (see ./features/serviceWorker.mjs)
if (rootElement.hasAttribute('data-service-worker')) {
  registerServiceWorker();
}

// Method/s called from ./features/salary.mjs
import('./features/salary.mjs').then(
  ({ annualSalary, dayRateOutside, dayRateInside }) => {
    console.groupCollapsed("Bruce's salary expectations");
    annualSalary();
    dayRateOutside();
    dayRateInside();
    console.groupEnd();
  },
);

// YouTube video facades (see ./components/youtubeFacade.mjs)
// Only downloaded on pages that actually contain a video. Rollup outputs it as a separate chunk.
// Without JS (or in `nomodule` browsers) the facade stays a plain link to the video on YouTube.
if (document.querySelector('.video__facade')) {
  import('./components/youtubeFacade.mjs').then(
    ({ default: youtubeFacade }) => {
      youtubeFacade();
    },
  );
}

// `<my-tech-skill-set>` custom element (see ./components/myTechSkillSet.mjs)
// Only downloaded on pages that use it (currently just the About page), as a separate chunk.
if (document.querySelector('my-tech-skill-set')) {
  import('./components/myTechSkillSet.mjs').then(
    ({ default: defineMyTechSkillSet }) => {
      defineMyTechSkillSet();
    },
  );
}
