[![Netlify Status](https://api.netlify.com/api/v1/badges/712367e5-7510-4813-9a24-5805f092cfa1/deploy-status)](https://app.netlify.com/sites/brootaylor-eleventy/deploys)
[![Daily build](https://img.shields.io/github/actions/workflow/status/brootaylor/brootaylor-v3/build.yml?style=flat&label=daily%20build)](https://github.com/brootaylor/brootaylor-v3/actions/workflows/build.yml)
[![Built with Eleventy](https://img.shields.io/badge/built_with-Eleventy-black?style=flat&logo=eleventy&logoColor=white)](https://www.11ty.dev/)
[![Node](https://img.shields.io/badge/node-24.22.3-339933?style=flat&logo=node.js&logoColor=white)](https://github.com/brootaylor/brootaylor-v3/blob/main/.nvmrc)
[![License](https://img.shields.io/github/license/brootaylor/brootaylor-v3?style=flat)](https://github.com/brootaylor/brootaylor-v3/blob/main/LICENSE)
[![1x-badge](https://img.shields.io/github/stars/cutenode/1x.engineer.svg?color=purple&label=1x%20Engineers&logo=image%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADAElEQVRoQ%2B1YPZMNQRQ9RyYiUCVkI0J%2BASUi4xfYzYjsVsmXX2BFZFauigyJ4hcQEtkNVQmoEjvqqh7VM6%2B%2FZ%2BapqXodvtdz%2B56%2B59zT3cTCBxeePzYA%2FncFNxUoqYCkEwC2AbwjeVTyTemctVRA0iUAH11SxwBekLxfmmRq3roA3AHwxEvkLcnrSwJwCOC2l%2FBDkg%2BWBOAzgAtewjdIvlkEAElnAHwDYEK28RvAWZLflwLAuP7aS%2FYLyYtTJG8xZhexJOP6vpfwc5LWUicZ6wDwHsAVL9u7JJ9Okv2YCki6SfJVKhFnYL8AnPTmXSb5yf%2BuJFZsnaYKSHoEYBfAIcmdWPCBgdk0E64J2IT8d0h65lz6gORebWWqAEg6DeAlgKveQjskrc%2BvDElJA5NkWjAA3TC63SL5oxRIMQC3m5b8%2BUHwn%2FZbaFFJUQNzm2HnolODePabgejRbBSF3E4ZbawC%2FrBzjWkhuJikpIG5TTEdnRvEtQrsxSrrz81WwOP7cBM%2BuOSD5S41MFcJA%2BF3qm6trC6iACJ87wI%2FJmkijg5JVQYm6QDAvUDApC6CADJ83y0pbYuBOaoakGJdrACwnuw6QxXfhzsnqcnAMrqwjtfznhCAr4FOk%2BR7IHk7uGUNLMa%2FhC6OSG4lRSzJ2tiwK1T15xIDy%2Bgn5Df2yTHJXhuPUcj6dzEPAxVovoFl9LedpZAlM7Y%2Fpwwss%2FPmzFV%2Bk2ujTf05Z2AhEK1%2BU2JkVf251MA6EGP9JgvAUcpKW9SfawxsCr8pAlCgi63uMFdqYG7nrWWP8ptiAA6ELTbURe84XWNggeN0ld9YTlUAPN52uujdb0tvYL6IvY6VPV%2BFxN8EwFVj5UrZamBrv1ImjgDNBpbyh9R%2FzRWI9PLZnhBjIKYGMNsT4uwAag2slTLD7yarQI2BTZV8cxuN8H%2FWJ8R1UKjpBja2GlNSyMzNrqPdZWjlCXFsspMaWcIL7MZ0zT07%2FntCnCP5STUwV4K5uJNRKLfQXP9vAMy1s6VxF1%2BBPxWSokDSvlDHAAAAAElFTkSuQmCC&style=flat)](https://1x.engineer)

# brootaylor.com

This version of my website is comprised of static files built using the fabulous [Eleventy](https://www.11ty.dev/) (SSG), configurable [NPM](https://docs.npmjs.com/cli/npm) build scripts, global data configuration, [Sass](https://sass-lang.com/) powered CSS system and [rollup.js](https://rollupjs.org/) to bundle JavaScript modules. Much of the content is also available offline thanks to a [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API).

It's deployed by and hosted with [Netlify](https://www.netlify.com/).

---

## Features

* 🌶 [Progressively enhanced](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement), semantic and accessible
* 🚀 [Lighthouse score thresholds checked on every Netlify build](https://github.com/brootaylor/brootaylor-v3/blob/main/config/lighthouse.mjs) (and locally with `npm run netlify-build`)
* 🌐 [Browser support config](https://github.com/brootaylor/brootaylor-v3/blob/main/.browserslistrc)
* ✅ [Accessibility test runner](https://github.com/pa11y/pa11y-ci)
* 🔎 [Debug styles that outline markup mistakes while developing](https://github.com/brootaylor/brootaylor-v3/blob/main/src/styles/debug.scss) (eg. images with no `alt`). Local only, never built for the live site
* 🌈 [Sass](https://sass-lang.com/) powered CSS system using the [Dart Sass implementation](https://sass-lang.com/dart-sass) - (utilising modern [custom CSS properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) and methods)
* 🧩 [Design Tokens](https://github.com/brootaylor/brootaylor-v3/tree/main/tokens)
* 🌓 [Light and dark colour schemes](https://github.com/brootaylor/brootaylor-v3/blob/main/src/styles/base/_custom-properties.scss) that follow the device setting, with a Light / Dark / System choice
* 🎳 [JS config to handle code-splitting](https://github.com/brootaylor/brootaylor-v3/blob/main/config/rollup.config.mjs) (ie. splitting code into smaller chunks to be loaded on demand)
* 🎛 [Site & build config](https://github.com/brootaylor/brootaylor-v3/blob/main/netlify.toml)
* 🛄 [Selective build outputs](https://github.com/brootaylor/brootaylor-v3/blob/main/.eleventyignore) using `.eleventyignore`
* ↩️ [Redirects](https://github.com/brootaylor/brootaylor-v3/blob/main/src/_redirects-production.njk) (built to Netlify's `_redirects` file)
* 🌍 [Customisable global data](https://github.com/brootaylor/brootaylor-v3/blob/main/src/_data/site.js)
* 🎨 Page-specific art direction. `head` and `foot` metadata fields enable things like styles, fonts, SVGs & JS
* 🔐 [Content Security Policy](https://github.com/brootaylor/brootaylor-v3/blob/main/lib/utils/headers/contentSecurityPolicy.js) built after each build, so inline `<script>` and `<style>` blocks are allowed automatically (by hash) and anything injected is blocked
* 🗡 [Edge function](https://github.com/brootaylor/brootaylor-v3/blob/main/netlify/edge-functions/aiAgents.js) that blocks *(known)* Ai crawlers, and anything following the hidden honeypot link, with the site's 403 page. Only blocked requests are logged
* 📮 [Edge function](https://github.com/brootaylor/brootaylor-v3/blob/main/netlify/edge-functions/browserReports.js) that logs the reports browsers send about problems (eg. something the Content Security Policy blocked)
* Dynamically generated...
  * [`serviceworker.js`](https://github.com/brootaylor/brootaylor-v3/blob/main/src/serviceworker.njk)
  * [`manifest.json`](https://github.com/brootaylor/brootaylor-v3/blob/main/src/manifest.njk)
  * [`sitemap.xml`](https://github.com/brootaylor/brootaylor-v3/blob/main/src/sitemap.njk)
  * [`robots.txt`](https://github.com/brootaylor/brootaylor-v3/blob/main/src/robots.njk)
  * [`ai.txt`](https://github.com/brootaylor/brootaylor-v3/blob/main/src/ai.njk)
  * [`feed.xml`](https://github.com/brootaylor/brootaylor-v3/blob/main/src/feed.njk)
  * [`bluesky-auth`](https://github.com/brootaylor/brootaylor-v3/blob/main/src/bluesky-auth.njk)
  * [`google-site-verification`](https://github.com/brootaylor/brootaylor-v3/blob/main/src/google-site-verification.njk)
* [JAMstack](https://jamstack.org/) methodology
* [Eleventy](https://www.11ty.dev/) (SSG)
* [Netlify](https://www.netlify.com/)
* 📧 [Netlify contact form](https://docs.netlify.com/forms/setup/)

---

## Roadmap

Possible features / enhancements for the future:

1.  ~~Light / Dark Theme option~~ ✔️
2.  Implement [Cloudinary](https://cloudinary.com/) for images
3.  [IndieWeb](https://indieweb.org/) & [Webmention](https://indieweb.org/Webmention)
4.  Make better use of utility classes
5.  Tags / categories
6.  Search
7.  ~~Daily build `CronJob` (Netlify build hook trigger)~~ ✔️
8.  ~~Add a Blogroll~~ ✔️
9.  ~~Pagination~~ ✔️

---

## Repo structure

```bash
brootaylor.com
├── .github
│   ├── dependabot.yml             # Monthly update pull requests for the GitHub Actions used in workflows
│   ├── workflows
│   │   ├── build.yml              # Scheduled workflow that triggers a Netlify build hook (daily build cron; fails if Netlify rejects the request)
│   │   ├── ci.yml                 # Lints and builds on every push to main and every pull request
│
├── audits
│   ├── accessibility_report       # pa11y results (`npm run audit:accessibility`)
│   ├── lighthouse_report          # Lighthouse HTML reports (`npm run audit:lighthouse:*`)
│
├── config
│   ├── eleventy-server.config.js  # Eleventy Dev Server configuration
│   ├── pa11y.json                 # Accessibility config
│   ├── lighthouse.mjs             # Lighthouse audit (build `dist/` or live site) with score thresholds
│   ├── postcss.config.js          # PostCSS converts modern CSS into something most browsers can understand
│   ├── rollup.config.mjs          # Rollup JS bundling configuration
│
├── lib
│   ├── collections                # Eleventy collections
│   ├── libraries                  # Eleventy libraries
│   ├── shortcodes                 # Eleventy shortcodes
│   ├── utils                      # Eleventy utilities (ie. filters, transforms, and the security headers written after each build)
│
├── netlify
│   ├── edge-functions             # Netlify Edge Functions (run on Deno, not Node)
│   ├── plugins
│   │   ├── lighthouse             # Local Netlify build plugin - Lighthouse scores in the Netlify UI (never fails the build)
│
├── src
│   ├── _content                   # Content (Markdown)
│   ├── _data                      # Global website data (eg. site, messages, navigation, contactform, ai_agents etc.)
│   ├── _includes                  # Layout templates, partials & components (Nunjucks, JS & SCSS)
│   ├── assets                     # Assets (ie. Static files like Fonts, Images, Video, Favicons)
│   ├── scripts                    # JavaScript (Global)
│   ├── styles                     # SCSS (Global), plus debug.scss (local development only)
│   ├── _redirects-production.njk  # _redirects template (Netlify page redirects)
│   ├── ai.njk                     # ai.txt template
│   ├── bluesky-auth.njk           # .well-known/atproto-did template (Bluesky domain verification)
│   ├── feed.njk                   # feed.xml template (Atom feed of the newest posts)
│   ├── google-site-verification.njk # Google Search Console verification file
│   ├── humans.txt.njk             # humans.txt template
│   ├── manifest.njk               # manifest.json template
│   ├── robots.njk                 # robots.txt template
│   ├── serviceworker.njk          # serviceworker.js template
│   └── sitemap.njk                # sitemap.xml template
│
├── tokens                         # Design tokens directory that holds individual design token JSON files (eg. colors.json)
│
├── .browserslistrc                # Browser support config list
├── .editorconfig                  # Text editor configuration
├── .eleventy.js                   # Eleventy configuration
├── .eleventyignore                # Directories / files eleventy needs to ignore when building
├── .env.example                   # Template for local .env config — copy to .env and adjust
├── .gitignore                     # Files not tracked by Git
├── .markdownlint.json             # Markdownlint configuration
├── .npmrc                         # npm install safeguards (install-script approvals, minimum release age)
├── .nvmrc                         # Sets (and installs if necessary) the version of Node needed for this project
├── .prettierrc                    # Prettier formatting config (enforced via eslint-plugin-prettier)
├── .prettierignore                # Files Prettier/ESLint should skip formatting
├── deno.lock                      # Lockfile for the Deno-based Netlify Edge Functions (created locally, not committed — see .gitignore)
├── eslint.config.js               # JS linting configuration
├── LICENSE                        # Repo licence (MIT)
├── netlify.toml                   # Netlify configuration (server)
├── package.json                   # Node.js package manifest
├── package-lock.json              # Node.js package lock
├── README.md                      # This file (Instructions and repo information)
└── SECURITY.md                    # How to report a security problem
```

---

## Supply chain guardrails

This repo uses npm's own settings to keep compromised packages from running or being installed.

* **Install-script approvals** — `.npmrc` sets `strict-allow-scripts=true`, so an install fails if any dependency's install scripts aren't approved under `allowScripts` in `package.json`. Approvals are per version, so bumping one of those packages needs a fresh review — see [approving install scripts after a version bump](#approving-install-scripts-after-a-version-bump).
* **Release age** — `.npmrc` sets `min-release-age=7`, so npm only installs versions that were published at least 7 days ago.
  * If `npx npm-check-updates -u` bumps a package to a version newer than that, `npm install` will refuse it. Wait a few days, or roll that package back to an older version.
* **npm audit** — runs in **prebuild** and reports known vulnerabilities. It's informational only and never fails the build.
* **GitHub Actions** — the workflows in `.github/workflows` pin each action to an exact commit ID (with its version in a comment on the same line), so a moved version label can't change the code CI runs. Dependabot (`.github/dependabot.yml`) opens one pull request a month to update them, only suggesting releases that are at least 7 days old. Review it, check CI passed on it, then merge. If you ever update a commit ID by hand, update its version comment too. The CI workflow can also only read the repo, and doesn't keep its access token after checking out the code, so later steps (like npm install scripts) can't use it.

### If a compromised package is announced

Check whether it's anywhere in the dependency tree:

```bash
npm ls <package>
```

If it is, and the installed version is one of the bad ones, move to a safe version (update the direct dependency, or add an override in `package.json`), then reinstall.

### Approving install scripts after a version bump

Bumping a package that has install scripts makes the install fail with `ESTRICTALLOWSCRIPTS`, and nothing is installed or removed. Approvals are read from the installed packages, so install the new versions without scripts first:

```bash
npm install --ignore-scripts           # install the new versions (and update the lockfile), running no scripts
npm install-scripts ls                 # list the scripts that need review
npm install-scripts approve <package>  # approve each one after reviewing it (replaces the old version's approval)
npm rebuild                            # run all approved install scripts
```

---

## Getting setup

Instructions for cloning and installing.

```bash
# Clone this repository
git clone git@github.com:brootaylor/brootaylor-v3.git

# Go to the working directory
cd brootaylor-v3

# Install dependencies, exactly as listed in package-lock.json
npm ci

# Copy the example env file, then adjust the addresses (URL, LOCAL_ENV_URL) for your setup
cp .env.example .env
```

## Netlify CI & CD setup

Instructions for installing, creating a [*new Netlify instance*], or linking a local dev instance to an existing remote Netlify site instance.

The Netlify CLI is already installed with the project's other dependencies (its version is pinned in `package.json`), so there's no need to install it globally. Run it with `npx netlify` (or the shorter `npx ntl`). The commands below leave out the `npx` for readability.

```bash
# Set up the deployment rules => (follow the instructions in this process)
netlify init

# Deploy to Netlify
netlify deploy
```

## Useful Netlify commands

Here are some other Netlify commands that can often be useful.

```bash
# Opens current site admin UI in Netlify
netlify open:admin

# Opens current site url in default browser
netlify open:site

# Handle various site operations
netlify sites

# Prints status info about the current Netlify user and site
netlify status

# Create a new deploy from the `dist` folder (creates a draft URL)
netlify deploy

# Show the last 24 hours of logs from an edge function (eg. the AI crawler blocker)
# Add `--follow` to watch new log lines as they arrive
netlify logs --edge-function aiAgents --since 24h

# Build plugins aren't managed with a command: they're listed under [[plugins]] in netlify.toml

# Link local repo or project folder (ie. `dist`) to an existing site on Netlify
netlify link

# Unlink local folder (ie. `dist`) from a Netlify site
netlify unlink
```

## Manually building & deploying

```bash
# Deploy to Netlify ("Draft"):
npm run netlify-deploy:draft

# then ("Production")...
npm run netlify-deploy:production
```

The changes will deploy to the live Netlify instance.

## Auto build & deployment

* My preferred method is to host on [Netlify](https://www.netlify.com/)
* This build process runs in a CI environment and then deploys the build automatically to a global CDN.
* Such deployments are [triggered automatically](https://docs.netlify.com/build/configure-builds/overview/) by every git push to the `main` branch of the origin repository.

---

## While developing

Here are a few ways to *watch* your code changes (while developing) and getting the browser to automatically refresh - (*locally* or '*live*').

### 1. Watch "local" environment

* Uses the Eleventy Dev Server to serve the site locally
* Various NPM commands run on the `dev` command and output any changes
* Loads the debug styles (`src/styles/debug.scss`), which outline markup mistakes like images with no `alt`

```bash
npm run dev
```

### 2. Spawn a full "local Netlify" environment

* Detects and runs your site generator - ie. `eleventy`
* Uses rules in local `netlify.toml` (and the Content Security Policy in the generated `dist/_headers`)
* Makes environment variables available
* Performs edge logic and routing rules
* Runs the edge functions (in `netlify/edge-functions/`)
* Loads the debug styles (`src/styles/debug.scss`), which outline markup mistakes like images with no `alt`

```bash
npm run netlify-dev
```

### 3. Stream your dev server to a live URL

* Great for collaborative development
* Share your work as you work
* Get instant feedback.
* Anyone viewing the live URL will also see the debug outlines

```bash
npm run netlify-dev:live
```

---

## Running audits

```bash
# View list of browsers supported in the development environment (ie. determines which CSS prefixes are generated etc.)
npm run audit:browser-support

# Runs the "pa11y" accessibility checks against the declared URL
npm run audit:accessibility

# Runs a "lighthouse" report against the local build (`dist/`) - also runs automatically on Netlify builds (and `npm run netlify-build`) via the local Netlify plugin
npm run audit:lighthouse:build

# Runs a "lighthouse" report against the live site and opens it in the browser
npm run audit:lighthouse:live
```

---

© [Bruce Taylor](https://brootaylor.com)
