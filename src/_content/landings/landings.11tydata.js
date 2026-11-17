export default {
  layout: 'layouts/landings.njk',
  permalink: '{{ page.fileSlug }}.html',
  changefreq: 'weekly',
  priority: '1',
  hidden: false, // `true` keeps a page out of search engines and the sitemap (see `meta.njk`)
};
