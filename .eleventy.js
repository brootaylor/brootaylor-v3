// Environment config
import { config } from 'dotenv';
config();

// Local server (Eleventy Dev Server)
import eleventyServer from './config/eleventy-server.config.js'

// Import (plugins)
import pluginSyntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight'

import pluginRss from '@11ty/eleventy-plugin-rss'
import pluginNavigation from '@11ty/eleventy-navigation'

// Import (libraries)
import { markdown } from './lib/libraries/markdown.js'
import markdownItAnchor from 'markdown-it-anchor'

// Import (filters)
import { prettyUrl } from './lib/utils/filters/pretty-url.js'
import { dateOnly } from './lib/utils/filters/dateOnly.js'
import { dateTime } from './lib/utils/filters/dateTime.js'
import { dateTimeReadable } from './lib/utils/filters/dateTimeReadable.js'
import { shuffleArray } from './lib/utils/filters/shuffle-array.js'

// Import (transforms)
import { minifyHtml } from './lib/utils/transforms/minify-html.js'

// Import (shortcodes)
import { photoGallery } from './lib/shortcodes/photoGallery.js'
import { projectThumbnails } from './lib/shortcodes/projectThumbnails.js'

// Import (collections)
import { pageProjects } from './lib/collections/pageProjects.js'
import { postWriting } from './lib/collections/postWriting.js'
import { postNotes } from './lib/collections/postNotes.js'
import { postBookmarks } from './lib/collections/postBookmarks.js'
import { postPhotos } from './lib/collections/postPhotos.js'

export default function (eleventy) {
  // Eleventy Dev Server
  eleventy.setServerOptions(eleventyServer)

  // Plugins
  eleventy.addPlugin(pluginSyntaxHighlight)
  eleventy.addPlugin(pluginRss)
  eleventy.addPlugin(pluginNavigation)

  // Libraries
  eleventy.setLibrary('md', markdown)

  // Customise Markdown library settings:
	eleventy.amendLibrary('md', mdLib => {
		mdLib.use(markdownItAnchor, {
			permalink: markdownItAnchor.permalink.ariaHidden({
				placement: 'after',
				class: 'header-anchor',
				symbol: '#',
				ariaHidden: false,
			}),
			level: [2,3,4],
			slugify: eleventy.getFilter('slugify')
		});
	});

  // Add some utility filters
  eleventy.addFilter('pretty', prettyUrl)
  eleventy.addFilter('dateOnly', dateOnly) // Generates numerial date (eg. 2020-02-22)
  eleventy.addFilter('dateTime', dateTime) // Generates numerical date and time (eg. 2020-02-22T09:50:00.000Z)
  eleventy.addFilter('dateTimeReadable', dateTimeReadable) // Generates readable date and time (eg. 22 February 2020, 9:50 am)
  eleventy.addFilter('shuffle', shuffleArray) // Shuffles an array of items (eg. [1, 2, 3, 4, 5] => [3, 1, 5, 2, 4])

  // Transforms
  eleventy.addTransform('minifyHtml', minifyHtml)

  // Shortcodes
  eleventy.addShortcode('year', () => `${new Date().getFullYear()}`)
  eleventy.addNunjucksAsyncShortcode('photo', photoGallery);
  eleventy.addNunjucksAsyncShortcode('thumbnail', projectThumbnails)

  // Collections
  eleventy.addCollection('pageProjects', pageProjects)
  eleventy.addCollection('postWriting', postWriting)
  eleventy.addCollection('postNotes', postNotes)
  eleventy.addCollection('postBookmarks', postBookmarks)
  eleventy.addCollection('postPhotos', postPhotos)

  // Passthrough
  eleventy.addPassthroughCopy('./src/assets/fonts')
  eleventy.addPassthroughCopy('./src/assets/ico')
  eleventy.addPassthroughCopy('./src/assets/icons')
  eleventy.addPassthroughCopy('./src/assets/images')
  eleventy.addPassthroughCopy('./src/assets/video')
  eleventy.addPassthroughCopy('./src/assets/docs')
  eleventy.addPassthroughCopy('./src/admin/config.yml')

  // Enable data deep merge
  eleventy.setDataDeepMerge(true)

  // Config
  return {
    templateFormats: ['md', 'njk', 'liquid', 'html'],

    pathPrefix: '',

    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    passthroughFileCopy: true,

    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: 'dist'
    }
  }
}
