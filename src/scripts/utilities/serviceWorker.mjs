/**
 * Service worker registration
 * ============================
 *
 * Registers `/serviceworker.js` (built from `src/serviceworker.njk`), which keeps recently
 * visited pages and images available offline.
 *
 * Called from `main-modules.mjs` when `<html>` has a `data-service-worker` attribute. `base.njk`
 * only adds that attribute on production builds with `scriptsServiceworker` set to `true` in
 * `_data/site.js`, so the service worker never gets in the way during local development.
 */
export default function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  navigator.serviceWorker.register('/serviceworker.js');

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
