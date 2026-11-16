# Scripts

The JS files in this directory are as follows:

* `main-modules.mjs` is the primary JS file. Rollup bundles it as a native JS module (ESM), along with any modules it imports. It isn't transpiled.
* The modules it loads are grouped by what they do:
  * `features/` holds site-wide behaviour, such as the bot honeypot link (`honeypot.mjs`) and service worker registration (`serviceWorker.mjs`).
  * `components/` holds scripts that enhance a particular piece of markup, such as the YouTube video player (`youtubeFacade.mjs`), which is only downloaded on pages with a video.
  * `utilities/` holds small reusable helpers, such as the element selector shortcuts in `domHelpers.mjs`.
* `main-nomodules.mjs` and `main-nojs.mjs` aren't built or loaded at the moment.

The `scripts.njk` include (`src/_includes/components/chrome/scripts/`) loads the bundle:

```html
<script type="module" src="/scripts/modules/main.mjs"></script>
```

Module scripts are deferred by default, so they don't block the page from rendering. There's no fallback script for browsers without module support (eg. Opera Mini and KaiOS 2.5). They get the page without the JS enhancements, which still works.
