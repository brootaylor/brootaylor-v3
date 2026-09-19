# PWA (Progressive Web App) assets

The files in this directory are needed to enable this web solution to behave like a [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps).

The web app manifest is generated from `src/manifest.njk`, which builds to `/manifest.json` and references the icon files in this directory (`android-chrome-*`, `apple-touch-icon.png`, `favicon*`). `mstile-150x150.png` and `safari-pinned-tab.svg` are referenced separately, from `src/browserconfig.njk` and `src/_includes/components/chrome/meta/meta.njk` respectively.
