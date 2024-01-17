[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/brootaylor/brootaylor-v3) [![1x-badge](https://img.shields.io/github/stars/cutenode/1x.engineer.svg?color=purple&label=1x%20Engineers&logo=image%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADAElEQVRoQ%2B1YPZMNQRQ9RyYiUCVkI0J%2BASUi4xfYzYjsVsmXX2BFZFauigyJ4hcQEtkNVQmoEjvqqh7VM6%2B%2FZ%2BapqXodvtdz%2B56%2B59zT3cTCBxeePzYA%2FncFNxUoqYCkEwC2AbwjeVTyTemctVRA0iUAH11SxwBekLxfmmRq3roA3AHwxEvkLcnrSwJwCOC2l%2FBDkg%2BWBOAzgAtewjdIvlkEAElnAHwDYEK28RvAWZLflwLAuP7aS%2FYLyYtTJG8xZhexJOP6vpfwc5LWUicZ6wDwHsAVL9u7JJ9Okv2YCki6SfJVKhFnYL8AnPTmXSb5yf%2BuJFZsnaYKSHoEYBfAIcmdWPCBgdk0E64J2IT8d0h65lz6gORebWWqAEg6DeAlgKveQjskrc%2BvDElJA5NkWjAA3TC63SL5oxRIMQC3m5b8%2BUHwn%2FZbaFFJUQNzm2HnolODePabgejRbBSF3E4ZbawC%2FrBzjWkhuJikpIG5TTEdnRvEtQrsxSrrz81WwOP7cBM%2BuOSD5S41MFcJA%2BF3qm6trC6iACJ87wI%2FJmkijg5JVQYm6QDAvUDApC6CADJ83y0pbYuBOaoakGJdrACwnuw6QxXfhzsnqcnAMrqwjtfznhCAr4FOk%2BR7IHk7uGUNLMa%2FhC6OSG4lRSzJ2tiwK1T15xIDy%2Bgn5Df2yTHJXhuPUcj6dzEPAxVovoFl9LedpZAlM7Y%2Fpwwss%2FPmzFV%2Bk2ujTf05Z2AhEK1%2BU2JkVf251MA6EGP9JgvAUcpKW9SfawxsCr8pAlCgi63uMFdqYG7nrWWP8ptiAA6ELTbURe84XWNggeN0ld9YTlUAPN52uujdb0tvYL6IvY6VPV%2BFxN8EwFVj5UrZamBrv1ImjgDNBpbyh9R%2FzRWI9PLZnhBjIKYGMNsT4uwAag2slTLD7yarQI2BTZV8cxuN8H%2FWJ8R1UKjpBja2GlNSyMzNrqPdZWjlCXFsspMaWcIL7MZ0zT07%2FntCnCP5STUwV4K5uJNRKLfQXP9vAMy1s6VxF1%2BBPxWSokDSvlDHAAAAAElFTkSuQmCC&style=for-the-badge)](https://1x.engineer)
[![Netlify Status](https://api.netlify.com/api/v1/badges/712367e5-7510-4813-9a24-5805f092cfa1/deploy-status)](https://app.netlify.com/sites/brootaylor-eleventy/deploys)

# brootaylor.com

This version of the website is comprised of static files built using the fabulous [Eleventy](https://www.11ty.io/) (SSG), configurable [NPM](https://docs.npmjs.com/cli/npm) build scripts, global data configuration, [Sass](https://sass-lang.com/) powered CSS system and [rollup.js](https://rollupjs.org/) to bundle JavaScript modules. Much of the content is also available offline thanks to a [Service Worker](https://developers.google.com/web/fundamentals/primers/service-workers).

It's deployed by and hosted with [Netlify](https://www.netlify.com/).

---

## Features

* 🌶 [Progressively enhanced](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement), semantic and accessible
* 🚀 [Performance budgeting](https://github.com/brootaylor/brootaylor-v2/blob/main/sites/eleventy/config/performance-budget.json)
* 🌐 [Browser support config](https://github.com/brootaylor/brootaylor-v2/blob/main/sites/eleventy/.browserslistrc)
* ✅ [Accessibility test runner](https://github.com/pa11y/pa11y-ci)
* 🌈 [Sass](https://sass-lang.com/) powered CSS system using the [Dart Sass implementation](https://sass-lang.com/dart-sass) - (utilising modern [custom CSS properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) and methods)
* 🧩 [Design Tokens](https://github.com/brootaylor/brootaylor-v2/tree/main/sites/eleventy/tokens)
* 🎳 [JS config to handle code-splitting](https://github.com/brootaylor/brootaylor-v2/blob/main/sites/eleventy/config/rollup.config.js) (ie. splitting code into smaller chunks to be loaded on demand)
* 🎛 [Site & build config](https://github.com/brootaylor/brootaylor-v2/blob/main/sites/eleventy/netlify.toml)
* 🛄 [Selective build outputs](https://github.com/brootaylor/brootaylor-v2/blob/main/sites/eleventy/.eleventyignore) using `.eleventyignore`
* ↩️ [Redirects](https://github.com/brootaylor/brootaylor-v2/blob/main/sites/eleventy/src/_redirects) for local `netlify dev`
* 🌍 [Customisable global data](https://github.com/brootaylor/brootaylor-v2/blob/main/sites/eleventy/src/_data/site.js)
* 🎨 Page-specific art direction. `head` and `foot` metadata fields enable things like styles, fonts, SVGs & JS
* Dynamically generated...
  * [`serviceworker.js`](https://github.com/brootaylor/brootaylor-v2/blob/main/sites/eleventy/src/serviceworker.njk)
  * [`manifest.json`](https://github.com/brootaylor/brootaylor-v2/blob/main/sites/eleventy/src/manifest.njk)
  * [`sitemap.xml`](https://github.com/brootaylor/brootaylor-v2/blob/main/sites/eleventy/src/sitemap.njk)
  * [`robots.txt`](https://github.com/brootaylor/brootaylor-v2/blob/main/sites/eleventy/src/robots.njk)
  * [`feed.xml`](https://github.com/brootaylor/brootaylor-v2/blob/main/sites/eleventy/src/feed.njk)
* [JAMstack](https://jamstack.org/) methodology
* [Eleventy](https://www.11ty.io/) (SSG)
* [Netlify](https://www.netlify.com/)
* 📧 [Netlify contact form](https://docs.netlify.com/forms/setup/)
* ✍️ [Netlify CMS setup](https://www.netlifycms.org/)

---

## Roadmap

Possible features / enhancements for the future:

1.  Light / Dark Theme option
2.  Implement [Cloudinary](https://cloudinary.com/) for images
3.  [IndieWeb](https://indieweb.org/) & [Webmention](https://indieweb.org/Webmention)
4.  Make better use of utility classes
5.  Tags / categories
6.  ~~Pagination~~ ✔️

---

## Repo structure

```bash
brootaylor.com
├── config
│   ├── eleventy-server.config.js  # Eleventy Dev Server configuration
│   ├── pa11y.json                 # Accessibility config
│   ├── performance-budget.json    # Lighthouse performance budget
│   ├── postcss.config.js          # PostCSS converts modern CSS into something most browsers can understand
│   ├── rollup.config.js           # Rollup JS bundling configuration
│
├── lib
│   ├── collections                # Eleventy collections
│   ├── libraries                  # Eleventy libraries
│   ├── shortcodes                 # Eleventy shortcodes
│   ├── utils                      # Eleventy utility templates (ie. filters, transforms etc.)
│
├── src
│   ├── _content                   # Content (Markdown)
│   ├── _data                      # Global website data (eg. site, messages, navigation & contactform)
│   ├── _includes                  # Layout templates, partials & components (Nunjucks, JS & SCSS)
│   ├── admin                      # Netlify CMS config files
│   ├── assets                     # Assets (ie. Static files like Fonts, Images, Video, Favicons)
│   ├── scripts                    # JavaScript (Global)
│   ├── styles                     # SCSS (Global)
│   ├── browserconfig.njk          # browserconfig.xml template (For Microsoft application usage)
│   ├── feed.njk                   # feed.xml template
│   ├── manifest.njk               # manifest.json template
│   ├── robots.njk                 # robots.txt template
│   ├── serviceworker.njk          # serviceworker.js template
│   └── sitemap.njk                # sitemap.xml template
│
├── tokens                         # Design tokens directory that holds individual design token JSON files (eg. colors.json)
│
├── .browserlistrc                 # Browser support config list
├── .editorconfig                  # Text editor configuration
├── .eleventy.js                   # Eleventy configuration
├── .eleventyignore                # Directories / files eleventy needs to ignore when building
├── .eslintignore                  # JS folders / files eslint needs to ignore
├── .eslintrc                      # JS linting configuration
├── .gitignore                     # Files not tracked by Git
├── .markdownlint.json             # Markdownlint configuration
├── .nvmrc                         # Sets (and installs if necessary) the version of Node needed for this project
├── .sass-lint.yml                 # SCSS linting configuration
├── LICENCE                        # Repo licence (MIT)
├── netlify.toml                   # Netlify configuration (server)
├── package.json                   # Node.js package manifest
├── package-lock.json              # Node.js package lock
└── README.md                      # This file (Instructions and repo information)
```

---

## Getting setup

Instructions for cloning and installing.

```bash
# Clone this repository
git clone git@github.com:brootaylor/brootaylor-v2.git

# Go to the working directory
cd brootaylor-v2

# Install dependencies
npm install
```

## Netlify CI & CD setup

Instructions for installing, creating a [*new Netlify instance*], or linking a local dev instance to an existing remote Netlify site instance.

```bash
# Install the Netlify CLI globally
npm i -g netlify-cli

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

# Manage netlify functions
# Ref: https://www.netlify.com/tags/functions/
netlify functions

# list installed plugins
# Ref: https://www.netlify.com/tags/plugins/
netlify plugins

# Link local repo or project folder (ie. `dist`) to an existing site on Netlify
netlify link

# Unlink local folder (ie. `dist`) from a Netlify site
netlify unlink
```

## Manually building & deploying

```bash
# Deploy to Netlify ("Draft"):
npm run deploy-draft

# then ("Production")...
npm run deploy-production
```

The changes will deploy to the live Netlify instance.

## Auto build & deployment

* My preferred method is to host on [Netlify](http://www.netlify.com)
* This build process runs in a CI environment and then deploys the build automatically to a global CDN.
* Such deployments are [triggered automatically](https://www.netlify.com/docs/continuous-deployment/) by every git push to the `main` branch of the origin repository.

---

## While developing

Here are a few ways to *watch* your code changes (while developing) and getting the browser to automatically refresh - (*locally* or '*live*').

### 1. Watch "local" environment

* Uses browserSync to open a local server
* Various NPM commands run on the `dev` command and output any changes

```bash
npm run dev
```

### 2. Spawn a full "local Netlify" environment

* Detects and runs your site generator - ie. `eleventy`
* Uses rules in local `netlify.toml`
* Makes environment variables available
* Performs edge logic and routing rules
* Compiles and runs cloud functions

```bash
netlify dev
```

### 3. Stream your dev server to a live URL

* Great for collaborative development
* Share your work as you work
* Get instant feedback.

```bash
netlify dev --live
```

---

## Running audits

```bash
# View list of browsers supported in the development environment (ie. determines which CSS prefixes are generated etc.)
npm run audit:browser-support

# Runs the "pa11y" accessibility checks against the declared URL
npm run audit:accessibility

# Runs a "lighthouse" performance report
npm run audit:performance
```

---

© [Bruce Taylor](https://brootaylor.com)
