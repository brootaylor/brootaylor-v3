/**
 * Honeypot link for scraper bots
 * ===============================
 *
 * Adds a hidden link to the `/honeypot` page. People never see it or reach it with a keyboard or
 * screen reader, so anything that visits `/honeypot` is almost certainly a bot following every link.
 *
 * Called from `main-modules.mjs` when `<html>` has a `data-honeypot` attribute (set in `base.njk`
 * when `botHoneypot` is `true` in `_data/site.js`).
 */
export default function addHoneypotLink() {
  const honeypotLink = document.createElement('a');
  honeypotLink.href = '/honeypot';
  honeypotLink.textContent = 'Honeypot be this way';
  honeypotLink.classList.add('hidden'); // `display: none`, so it's hidden from everyone
  honeypotLink.setAttribute('aria-hidden', 'true'); // Make sure screen readers ignore it
  honeypotLink.tabIndex = -1; // Keep it out of keyboard navigation
  honeypotLink.rel = 'nofollow'; // Ask search engines not to follow it
  document.body.append(honeypotLink);
}
