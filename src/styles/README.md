# SASS directory & guidelines

The `main.scss` file is the parent file that *'imports'* (`@use`) all the other Sass partials.

It's compiled into a `main.css` file that's then used in this web solution.

## Debug styles (local development only)

`debug.scss` outlines markup mistakes in red (dashed) while working on the site. It currently flags:

* images with no `alt` attribute (`alt=""` is fine: it marks an image as decorative)
* links with no `href` attribute
* dialogs with no `aria-label` or `aria-labelledby`
* every `<h1>` after the first one on a page (the first isn't outlined)

Inspect a highlighted element in DevTools to see why: each rule sets an `--ERROR` custom property with the reason.

It's compiled into `debug.css`, which:

* is only linked when Eleventy runs its dev server: `npm run dev`, and `npm run netlify-dev` (which runs `npm run dev`). See `components/chrome/meta/meta.njk`
* is never built for production, because `sass:prod` in `package.json` only compiles `main.scss`

To add a check, follow the same pattern: a selector for the mistake, an `--ERROR` message, and the red dashed `outline` with `outline-offset: -3px`.

## Builds

On a build (`npm run build:styles`), Sass compiles `main.css` first, then PostCSS adds any fallbacks and prefixes the browsers in `.browserslistrc` need (`config/postcss.config.js`). Both happen before Eleventy runs, because `src/_data/assetVersion.js` fingerprints the finished file for its `?version=` address.
