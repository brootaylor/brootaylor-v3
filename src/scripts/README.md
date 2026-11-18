# Scripts

The JS files in this directory are as follows:

* `main-modules.mjs` is the primary JS file. Rollup bundles it as a native JS module (ESM), along with any modules it imports. It isn't transpiled.
* The modules it loads are grouped by what they do:
  * `features/` holds site-wide behaviour, such as the bot honeypot link (`honeypot.mjs`), service worker registration (`serviceWorker.mjs`) and the Light / Dark / System colour scheme choice (`colourScheme.mjs`). Each one is switched on in `_data/site.js`, which `base.njk` passes on as a `data-` attribute on `<html>`.
  * `components/` holds scripts that enhance a particular piece of markup, such as the YouTube video player (`youtubeFacade.mjs`), which is only downloaded on pages with a video, the "reply to this post by email" option on writing posts (`replyByEmail.mjs`), and filling in the contact form's Subject field when a post links to it (`contactSubject.mjs`).
  * `utilities/` holds small reusable helpers, such as the element selector shortcuts in `domHelpers.mjs`.
* `main-nomodules.mjs` and `main-nojs.mjs` aren't built or loaded at the moment.

The `scripts.njk` include (`src/_includes/components/chrome/scripts/`) loads the bundle:

```html
<script type="module" src="/scripts/modules/main.mjs"></script>
```

Module scripts are deferred by default, so they don't block the page from rendering. There's no fallback script for browsers without module support (eg. Opera Mini and KaiOS 2.5). They get the page without the JS enhancements, which still works.

There's one small inline script outside this directory: `src/_includes/components/chrome/meta/colour-scheme-init.js`, included in the `<head>` by `meta.njk`. It applies a saved colour scheme before the page is drawn, which a deferred module can't do. The Content Security Policy allows it by its hash, which the build works out for every inline `<script>` and `<style>` block (`lib/utils/headers/contentSecurityPolicy.js`).
