# Scripts

The JS files in this directory are as follows:

* `main-modules.mjs` is the primary JS file. Rollup bundles it as a native JS module (ESM), along with any modules it imports. It isn't transpiled.
* `utilities/` holds the modules it loads, such as the YouTube video player (`youtubeFacade.mjs`), which is only downloaded on pages with a video.
* `main-nomodules.mjs` and `main-nojs.mjs` aren't built or loaded at the moment.

The `scripts.njk` include (`src/_includes/components/chrome/scripts/`) loads the bundle:

```html
<script type="module" src="/scripts/modules/main.mjs"></script>
```

Module scripts are deferred by default, so they don't block the page from rendering. Every browser in `.browserslistrc` supports them, so no fallback script for older browsers is needed.
