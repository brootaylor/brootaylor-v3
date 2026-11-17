/**
 * Service worker registration
 * ============================
 *
 * Registers `/serviceworker.js` (built from `src/serviceworker.njk`), which keeps the site's styles
 * and scripts, and recently visited pages and images, available offline.
 *
 * Called from `main-modules.mjs` when `<html>` has a `data-service-worker` attribute. `base.njk`
 * only adds that attribute on production builds with `scriptsServiceworker` set to `true` in
 * `_data/site.js`, so the service worker never gets in the way during local development.
 */

const serviceWorkerUrl = '/serviceworker.js';

/**
 * Trusted Types (see `lib/utils/headers/contentSecurityPolicy.js`): when they're enforced, `register()` refuses
 * a plain string, because a script address is something an attacker could try to swap. So the address goes
 * through a named policy, `service-worker` (the only name the CSP allows), which accepts this one address and
 * nothing else. Browsers without Trusted Types just get the plain string.
 */
function trustedServiceWorkerUrl() {
  const policy = window.trustedTypes?.createPolicy('service-worker', {
    createScriptURL(url) {
      if (url !== serviceWorkerUrl) {
        throw new TypeError(
          `Only ${serviceWorkerUrl} can be registered as the service worker`,
        );
      }
      return url;
    },
  });

  return policy ? policy.createScriptURL(serviceWorkerUrl) : serviceWorkerUrl;
}

// `async`, so an error from the policy or from `register()` (eg. the script can't be fetched) ends up in the
// one `.catch()` below
async function register() {
  await navigator.serviceWorker.register(trustedServiceWorkerUrl());
}

export default function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  // Catching a failure logs one clear message, instead of an "Uncaught (in promise)" error
  register().catch((error) => {
    console.error('Service worker registration failed:', error);
  });

  // Sent by the service worker if it couldn't set up offline functionality
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data?.type === 'installFailed') {
      console.warn(event.data.message);
    }
  });

  // Once the page has fully loaded, ask the service worker that's already in control (if there is
  // one) to trim its page and image caches back to their size limits. Waiting for `load` keeps
  // this housekeeping out of the way of the page itself.
  // This module is part of the main module script, which always runs before `load`, so the
  // listener can't miss the event.
  if (navigator.serviceWorker.controller) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.controller?.postMessage({
        command: 'trimCaches',
      });
    });
  }
}
