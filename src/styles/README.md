# SASS directory & guidelines

The `main.scss` file is the parent file that *'imports'* (`@use`) all the other Sass partials.

It's compiled into a `main.css` file that's then used in this web solution.

On a build (`npm run build:styles`), Sass compiles `main.css` first, then PostCSS adds any fallbacks and prefixes the browsers in `.browserslistrc` need (`config/postcss.config.js`). Both happen before Eleventy runs, because `src/_data/assetVersion.js` fingerprints the finished file for its `?version=` address.
