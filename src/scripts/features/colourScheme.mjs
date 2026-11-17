/**
 * Colour scheme choice (Light / Dark / System)
 * =============================================
 *
 * Makes the colour scheme controls work (the footer one and the one on the Accessibility page, both from
 * `components/units/colour-scheme/colour-scheme.njk`).
 *
 * How the choice is applied:
 * - It's stored in `localStorage` under `colour-scheme`, as `light` or `dark`. "System" means nothing is stored.
 * - It's applied by setting `<meta name="color-scheme">` to `light`, `dark`, or `light dark` (follow the device).
 *   The CSS in `base/_reset.scss` reads that tag, and every `--colour-*` colour follows it.
 * - The small inline script in `meta.njk` applies a stored choice before the page is drawn. This module
 *   applies it again as a backup, in case that script was blocked (eg. its CSP hash is out of date).
 *
 * A stored Light or Dark is never removed just because the device setting changes to match it. Lots of
 * devices switch between light and dark by time of day, and clearing the choice then would make it
 * impossible to stick with one scheme. Only picking "System" clears it.
 *
 * Called from `main-modules.mjs` when `<html>` has a `data-colour-scheme` attribute (set in `base.njk`
 * when `colourSchemeChoice` is `true` in `_data/site.js`).
 */

const storageKey = 'colour-scheme';
const followDevice = 'light dark'; // `<meta>` value meaning "follow the device setting"
const radioSelector = '.colour-scheme input[type="radio"]';

// The visitor's stored choice (`light` or `dark`), or `null` for "System".
// Reading `localStorage` can throw when site data is blocked, so that counts as "System".
function getStoredScheme() {
  try {
    const stored = localStorage.getItem(storageKey);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    return null;
  }
}

// Save the choice, or remove it for "System". If saving fails (site data blocked), the choice still
// applies to the current page; it just won't be remembered.
function storeScheme(scheme) {
  try {
    if (scheme) {
      localStorage.setItem(storageKey, scheme);
    } else {
      localStorage.removeItem(storageKey);
    }
  } catch {
    // Nothing else to do: see above
  }
}

// Apply a choice to the page, and tick the matching option in every control on it
function showScheme(scheme, schemeMeta) {
  schemeMeta.content = scheme ?? followDevice;

  document.querySelectorAll(radioSelector).forEach((radio) => {
    radio.checked = radio.value === (scheme ?? 'system');
  });
}

export default function colourScheme() {
  const schemeMeta = document.querySelector('meta[name="color-scheme"]');

  if (!schemeMeta) {
    return;
  }

  showScheme(getStoredScheme(), schemeMeta);

  // The controls are `hidden` in the HTML, because they can't work without this script
  document.querySelectorAll('.colour-scheme').forEach((control) => {
    control.hidden = false;
  });

  // One listener for every control on the page (`change` events bubble up to `document`)
  document.addEventListener('change', (event) => {
    if (!event.target.matches(radioSelector)) {
      return;
    }

    const scheme = event.target.value === 'system' ? null : event.target.value;
    storeScheme(scheme);
    showScheme(scheme, schemeMeta);
  });

  // Keep other open tabs in step: the `storage` event fires in every other tab when the choice changes there.
  // (`event.key` is `null` when all of the site's storage is cleared.)
  window.addEventListener('storage', (event) => {
    if (event.key === storageKey || event.key === null) {
      showScheme(getStoredScheme(), schemeMeta);
    }
  });
}
