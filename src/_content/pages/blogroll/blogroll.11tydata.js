const normalizeUrl = require('normalize-url');

module.exports = {
  layout: 'layouts/blogroll.njk',
  eleventyComputed: {
    // This is a computed data property that takes the raw blog data and adds a cleansed URL and a favicon to the object
    blogData: function ({ blogs }) {
      return blogs.map((rawBlogInfo) => {
        const encodedUri = encodeURIComponent(rawBlogInfo.url);
        // This is a hack to get the favicon from the blog's URL
        const favicon = `https://v1.indieweb-avatar.11ty.dev/${encodedUri}/`;

        return {
          // Spread the rawBlogInfo object
          ...rawBlogInfo,
          // Add the cleansed URL to the object
          cleansedUrl: normalizeUrl(rawBlogInfo.url, { stripProtocol: true }),
          // Add the favicon to the object
          favicon,
        };
      });
    },
  },
};
