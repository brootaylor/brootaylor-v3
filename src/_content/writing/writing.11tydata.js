export default {
  layout: 'layouts/writing.njk',
  bodyClass: 'blog writing',
  tags: ['post', 'writing'],
  permalink: '/writing/{{ date | dateOnly }}/{{ page.fileSlug }}.html',
  changefreq: 'monthly',
  priority: '0.9',
  hidden: false, // `true` keeps a page out of search engines and the sitemap (see `meta.njk`)
};
