/**
 * Scrambles an email address (base64) so it isn't readable in the built HTML.
 *
 * Used by the "reply to this post by email" option in `layouts/writing.njk`. The scrambled address goes in a
 * `data-` attribute, and `src/scripts/components/replyByEmail.mjs` turns it back into a `mailto:` link in the
 * browser with the built-in `atob()`.
 *
 * Limits: this stops bots that collect addresses by scanning page source for them. It doesn't stop a person
 * (or a bot that runs JavaScript) from finding it, and the address is still in `src/_data/site.js` in the
 * public GitHub repo.
 *
 * @param {String} email The email address (eg. `site.author.email`)
 * @return {String} The address encoded as base64
 */
export const obscureEmail = (email) => btoa(String(email || ''));
