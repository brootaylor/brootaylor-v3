/**
 * Formats an image `alt` attribute value so it always ends with terminal punctuation.
 * Prevents doubled punctuation (eg. "...resources.." ) when the source alt text
 * already ends in . ! or ? — used for <img alt>, og:image:alt and twitter:image:alt.
 *
 * @param {String} altText The raw alt text from front matter / image data
 * @return {String} The alt text, guaranteed to end with . ! or ?
 */
export const imageAlt = (altText) => {
  const text = String(altText || '');
  return /[.!?]$/.test(text) ? text : `${text}.`;
};
