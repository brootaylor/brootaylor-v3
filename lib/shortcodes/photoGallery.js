import Image from '@11ty/eleventy-img';

/**
 * Get HTML `picture` element for cached image
 *
 * Usage: {% photo "path/to/image.jpg", "class", "Alt text.", "sizes", "lazy" %}
 *
 * @param {string} src     Path to the source image
 * @param {string} cls     Class name(s) for the `<img>`
 * @param {string} alt     Alt text (required - an empty string is fine for decorative images)
 * @param {string} sizes   The `sizes` attribute
 * @param {string} loading Optional. `"lazy"` delays downloading the image until it's close to
 *                         being scrolled into view. Leave it off (the default, `"eager"`) for the
 *                         first photo on a page: it's usually the largest thing on screen, and
 *                         lazy-loading it would make the page look slower to load.
 */
export const photoGallery = async (src, cls, alt, sizes, loading = 'eager') => {
  let metadata = await Image(src, {
    widths: [480, 960, 1200],
    formats: ['webp', 'jpeg'],
    urlPath: '/assets/images/posts/photos/',
    outputDir: './dist/assets/images/posts/photos/',
    cacheOptions: {
      duration: '1y',
    },
    sharpWebpOptions: {
      quality: 80,
    },
    sharpJpegOptions: {
      quality: 80,
    },
  });

  let imageAttributes = {
    class: cls,
    alt,
    sizes,
  };

  // Photos further down the page: download them only when needed (`loading`), and let the browser
  // decode them without holding up other work on the page (`decoding`).
  if (loading === 'lazy') {
    imageAttributes.loading = 'lazy';
    imageAttributes.decoding = 'async';
  }

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: 'inline',
  });
};
