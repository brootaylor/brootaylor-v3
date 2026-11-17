# `_data` directory

This directory holds various bits of data that the website can access globally.

For example:

* The **global site** values (eg. metadata) can be found in `site.js`.
* The **navigation** (primary & footer) labels and URLs can be found in `navigation.js`.
* The **CV** content (roles, earlier roles, personal projects and skills) can be found in `cv.js`. It's rendered on the `/cv` page and feeds its structured data.
* The **messages** values (eg. message) can be found in `messages.js`.
* The **contact form** values (eg. intro, labels etc.) can be found in `contactform.js`.
* The **AI crawler** names can be found in `ai_agents.json`. They're used by `robots.njk` (to build `robots.txt`) and by the edge function that blocks those crawlers (`netlify/edge-functions/aiAgents.js`).
* The **asset version** (`assetVersion.js`) is a short fingerprint of the built CSS and JS. It goes on the end of their addresses (`?version=…`) and into the service worker's cache names, so both only change when the files actually do.
* The **script chunks** (`scriptChunks.js`) are the hash-named extra script files Rollup builds alongside `main.mjs`. The service worker saves them (with `main.mjs`) when it installs, so the site's JavaScript works offline.
* The **design token** values (eg. primary colours) can be found in the top-level `tokens/` directory (converted to SCSS via `json-to-scss`, not in `_data`).
