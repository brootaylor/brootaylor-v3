import markdownIt from 'markdown-it';
import markdownItAbbr from 'markdown-it-abbr';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItAttrs from 'markdown-it-attrs';
import slugify from '@sindresorhus/slugify';

// module.exports = (() => {
export const markdown = (() => {
  const options = {
    html: true,
    breaks: true,
    typographer: true,
  };

  const plugins = [
    markdownItAbbr,
    [
      markdownItAnchor,
      {
        permalink: markdownItAnchor.permalink.ariaHidden({
          placement: 'after',
          class: 'header-anchor',
          symbol: '#',
          ariaHidden: false,
        }),
        level: [2, 3, 4],
        slugify: (str) => slugify(str, { decamelize: false }),
      },
    ],
    markdownItAttrs,
  ];

  const parser = markdownIt(options);

  if (plugins) {
    for (const plugin of plugins) {
      if (Array.isArray(plugin)) {
        // Allow array of options to be passed.
        parser.use(...plugin);
      } else {
        parser.use(plugin);
      }
    }
  }

  return parser;
})();
