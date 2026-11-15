/**
 * Dynamic module loading
 */

import { version, name } from '../../package.json';

const versionPrintOut = `${name}.${version}`;
console.info(versionPrintOut);

// Method/s called from ./utilities/salary.mjs
import('./utilities/salary.mjs').then(
  ({ annualSalary, dayRateOutside, dayRateInside }) => {
    console.groupCollapsed("Bruce's salary expectations");
    annualSalary();
    dayRateOutside();
    dayRateInside();
    console.groupEnd();
  },
);

// YouTube video facades (see ./utilities/youtubeFacade.mjs)
// Only downloaded on pages that actually contain a video. Rollup outputs it as a separate chunk.
// Without JS (or in `nomodule` browsers) the facade stays a plain link to the video on YouTube.
if (document.querySelector('.video__facade')) {
  import('./utilities/youtubeFacade.mjs').then(({ default: youtubeFacade }) => {
    youtubeFacade();
  });
}
