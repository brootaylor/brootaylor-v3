// Environment config
import { config } from 'dotenv';
// `quiet: true` stops dotenv (v17+) logging an "injected env" line on every build
config({ quiet: true });

// Local server (Eleventy Dev Server)
import eleventyServer from './config/eleventy-server.config.js';

// Import (plugins)
import pluginSyntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import pluginRss from '@11ty/eleventy-plugin-rss';
import pluginNavigation from '@11ty/eleventy-navigation';

// Import (libraries)
import { markdown } from './lib/libraries/markdown.js';

// Import (filters)
import { prettyUrl } from './lib/utils/filters/pretty-url.js';
import { dateOnly } from './lib/utils/filters/dateOnly.js';
import { dateTime } from './lib/utils/filters/dateTime.js';
import { dateTimeReadable } from './lib/utils/filters/dateTimeReadable.js';
import { shuffleArray } from './lib/utils/filters/shuffle-array.js';
import { imageAlt } from './lib/utils/filters/image-alt.js';

// Import (transforms)
import { minifyHtml } from './lib/utils/transforms/minify-html.js';

// Headers
import { writeContentSecurityPolicy } from './lib/utils/headers/contentSecurityPolicy.js';

// Import (shortcodes)
import { photoGallery } from './lib/shortcodes/photoGallery.js';
import { projectThumbnails } from './lib/shortcodes/projectThumbnails.js';
import { youtube } from './lib/shortcodes/youtube.js';

// Import (collections)
import { pageProjects } from './lib/collections/pageProjects.js';
import { postWriting } from './lib/collections/postWriting.js';
import { postNotes } from './lib/collections/postNotes.js';
import { postBookmarks } from './lib/collections/postBookmarks.js';
import { postPhotos } from './lib/collections/postPhotos.js';

export default function (eleventy) {
  // Eleventy Dev Server
  eleventy.setServerOptions(eleventyServer);

  // Plugins
  eleventy.addPlugin(pluginSyntaxHighlight);
  eleventy.addPlugin(pluginRss);
  eleventy.addPlugin(pluginNavigation);

  // Libraries
  eleventy.setLibrary('md', markdown);

  // Add some utility filters
  eleventy.addFilter('pretty', prettyUrl);
  eleventy.addFilter('dateOnly', dateOnly); // Generates numerical date (eg. 2020-02-22)
  eleventy.addFilter('dateTime', dateTime); // Generates numerical date and time (eg. 2020-02-22T09:50:00.000Z)
  eleventy.addFilter('dateTimeReadable', dateTimeReadable); // Generates readable date and time (eg. 22 February 2020, 9:50 am)
  eleventy.addFilter('shuffle', shuffleArray); // Shuffles an array of items (eg. [1, 2, 3, 4, 5] => [3, 1, 5, 2, 4])
  eleventy.addFilter('imageAlt', imageAlt); // Guarantees an image alt attribute ends with terminal punctuation

  // Transforms
  eleventy.addTransform('minifyHtml', minifyHtml);

  // After each build: write the Content Security Policy to `dist/_headers`, allowing every inline
  // <script> and <style> block in the built pages by its hash
  eleventy.on('eleventy.after', writeContentSecurityPolicy);

  // Shortcodes
  eleventy.addShortcode('year', () => `${new Date().getFullYear()}`);
  eleventy.addNunjucksAsyncShortcode('photo', photoGallery);
  eleventy.addNunjucksAsyncShortcode('thumbnail', projectThumbnails);
  eleventy.addNunjucksAsyncShortcode('youtube', youtube); // Click-to-load YouTube facade, eg. {% youtube "id", "Title", 144 %}

  // Collections
  eleventy.addCollection('pageProjects', pageProjects);
  eleventy.addCollection('postWriting', postWriting);
  eleventy.addCollection('postNotes', postNotes);
  eleventy.addCollection('postBookmarks', postBookmarks);
  eleventy.addCollection('postPhotos', postPhotos);

  // Passthrough (copied to `dist/` as they are). The site uses system fonts and has no self-hosted video,
  // so there's no `fonts` or `video` folder. Add a line here if either comes back.
  eleventy.addPassthroughCopy('./src/assets/ico');
  eleventy.addPassthroughCopy('./src/assets/icons');
  eleventy.addPassthroughCopy('./src/assets/images');
  eleventy.addPassthroughCopy('./src/assets/docs');

  // Enable data deep merge
  eleventy.setDataDeepMerge(true);

  // Config
  return {
    templateFormats: ['md', 'njk', 'liquid', 'html'],

    pathPrefix: '',

    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',

    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: 'dist',
    },
  };
}
