export default {
  layout: 'layouts/bookmarks.njk',
  bodyClass: 'blog bookmarks',
  tags: ['post', 'bookmarks'],
  permalink: '/bookmarks/{{ date | dateOnly }}/{{ page.fileSlug }}.html',
  changefreq: 'monthly',
  priority: '0.9',
  hidden: 'false',
};
