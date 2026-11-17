import markdownIt from 'markdown-it';
import markdownItAbbr from 'markdown-it-abbr';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItAttrs from 'markdown-it-attrs';
import slugify from '@sindresorhus/slugify';

export const markdown = (() => {
  const options = {
    html: true,
    breaks: true,
    typographer: true,
  };

  const plugins = [
    markdownItAbbr,
    // Gives every h2-h4 an `id` (eg. `## My offering` -> `<h2 id="my-offering" tabindex="-1">`), so any
    // section can be linked to (`/writing/…/post#my-offering`).
    // - No visible "#" link is added. It used to sit inside each heading, so screen readers read every heading
    //   as "My offering #", and every one of those links had the same name ("#") while going somewhere different.
    // - `tabindex="-1"` is the plugin's default and is kept on purpose: when someone follows a link to a
    //   section, focus can move to the heading itself, without adding headings to the Tab order.
    // - Changing `level` or `slugify` would change existing `id`s and break links to them, eg. the About page
    //   links to `/projects#projects-testimonials`.
    [
      markdownItAnchor,
      {
        level: [2, 3, 4],
        slugify: (str) => slugify(str, { decamelize: false }),
      },
    ],
    markdownItAttrs,
  ];

  const parser = markdownIt(options);

  for (const plugin of plugins) {
    if (Array.isArray(plugin)) {
      // A plugin listed as `[plugin, options]` gets its options passed in
      parser.use(...plugin);
    } else {
      parser.use(plugin);
    }
  }

  return parser;
})();
