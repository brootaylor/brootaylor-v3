const normalizeUrl = require('normalize-url');

module.exports = {
  layout: 'layouts/blogroll.njk',
  permalink: '{{ page.fileSlug }}.html',
  changefreq: 'weekly',
  priority: '1',
  hidden: 'false',
  eleventyComputed: {
    blogData: function ({ blogs }) {
      return Promise.all(
        blogs.map((rawBlogInfo) => {
          const encodedUri = encodeURIComponent(rawBlogInfo.url);
          const favicon = `https://v1.indieweb-avatar.11ty.dev/${encodedUri}/`;

          return {
            ...rawBlogInfo,
            cleansedUrl: normalizeUrl(rawBlogInfo.url, { stripProtocol: true }),
            favicon,
          };
        }),
      );
    },
  },
};
