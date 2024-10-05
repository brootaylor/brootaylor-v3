import Image from '@11ty/eleventy-img';

/**
 * Get HTML `picture` element for cached image
 */
export const photoGallery = async (src, cls, alt, sizes) => {
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

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: 'inline',
  });
};
