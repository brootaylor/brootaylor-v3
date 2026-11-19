import Image from '@11ty/eleventy-img';
// import EleventyFetch from '@11ty/eleventy-fetch'; // Only needed by the Vimeo placeholder below

/**
 * Video facade (click-to-load embedded videos)
 * ============================================
 *
 * Usage (in Markdown or Nunjucks), one shortcode for every provider:
 *   {% video "youtube", "nsekqm6eaD8", "Video title" %}
 *   {% video "youtube", "flsgJe8mN-A", "Video title", 144 %}   <- optional start time, in seconds
 *
 * The first argument picks the provider from the `providers` table below.
 *
 * WHY:
 * A raw embedded player, such as YouTube's <iframe>, downloads the whole player (~1MB of JS for
 * YouTube) on page load, and lets the provider (eg. YouTube/Google) receive the visitor's IP and
 * store data on their device before they've chosen to watch anything. This renders a
 * lightweight stand-in (a "facade") instead.
 *
 * HOW (progressive enhancement):
 * 1. Baseline (no JS, feed readers, legacy browsers):
 *    A self-hosted thumbnail + play icon, wrapped in a normal link to the video on the
 *    provider's site, with a visible "Watch on …" badge so it's clear the link leaves the site.
 * 2. Enhanced (JS available):
 *    The link sits inside a `<video-facade provider="…">` custom element. Its script
 *    (`src/scripts/components/videoFacade.mjs`) swaps the link for a <button> that loads the
 *    provider's player in place, only when it's clicked.
 *
 * The thumbnail is fetched from the provider ONCE at build time and saved alongside the site's
 * own images, so visitors never request anything from the provider until they press play.
 *
 * PROVIDERS:
 * Each provider's own details live in the `providers` table below; everything else is shared.
 * YouTube is the only provider switched on for now. There's a commented-out Vimeo entry in the
 * table as an example, with the steps to switch it on. Adding a provider needs no new shortcode:
 * an entry here and in the script's `providers` table, plus its player in the CSP's `frame-src`
 * (`lib/utils/headers/contentSecurityPolicy.js`). Native, self-hosted video doesn't need any of
 * this: a plain `<video controls preload="none" loading="lazy" poster="…">`
 * (see `src/_includes/components/core/videos/videos.njk`) loads nothing but its poster until play
 * is pressed.
 */

const providers = {
  youtube: {
    // Used in the badge, the caption and the hidden link text
    name: 'YouTube',

    // The no-JS destination: the video on YouTube itself, at the right start time
    watchUrl: (videoId, start) =>
      `https://www.youtube.com/watch?v=${videoId}${start ? `&t=${start}s` : ''}`,

    // Thumbnails to try, best first. YouTube's best thumbnail (`maxresdefault`, 1280x720)
    // doesn't exist for every video, so fall back to `hqdefault` (480x360, letterboxed - the CSS
    // crops the black bars off). Awaited, so a provider that has to look its thumbnail up
    // (eg. through Vimeo's API) can return a promise instead.
    thumbnailUrls: (videoId) =>
      ['maxresdefault', 'hqdefault'].map(
        (size) => `https://i.ytimg.com/vi/${videoId}/${size}.jpg`,
      ),
  },

  // PLACEHOLDER: Vimeo - an example second provider, NOT switched on (and untested: there are no
  // Vimeo videos on the site yet). It's here to show the facade isn't tied to YouTube.
  // Once switched on, it's used as `{% video "vimeo", "76979871", "Video title", 144 %}`.
  // To switch it on:
  //   1. Uncomment this entry and the `EleventyFetch` import at the top of this file
  //   2. Uncomment the matching entry in `src/scripts/components/videoFacade.mjs`
  //   3. Add `https://player.vimeo.com` to `frame-src` in `lib/utils/headers/contentSecurityPolicy.js`
  //   4. Add a Vimeo paragraph to the privacy page's "Embedded Videos" section
  //   5. Check Vimeo plays with the site's `Referrer-Policy` (see the note in `netlify.toml`)
  //   6. Test it in a browser, including which domains the player loads from
  //
  // vimeo: {
  //   name: 'Vimeo',
  //
  //   // Vimeo's start time is a `#t=` fragment, eg. `https://vimeo.com/76979871#t=315s`
  //   watchUrl: (videoId, start) =>
  //     `https://vimeo.com/${videoId}${start ? `#t=${start}s` : ''}`,
  //
  //   // Vimeo has no fixed thumbnail addresses, so ask its oEmbed API for one at build time.
  //   // `width=1280` asks for a 1280x720 thumbnail. EleventyFetch caches the answer for a year
  //   // (in `.cache/`, like the images). If the lookup fails, the video renders without a
  //   // thumbnail rather than failing the build (see `getThumbnail()`).
  //   thumbnailUrls: async (videoId) => {
  //     const oembed = await EleventyFetch(
  //       `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(`https://vimeo.com/${videoId}`)}&width=1280`,
  //       { duration: '1y', type: 'json' },
  //     );
  //     return [oembed.thumbnail_url];
  //   },
  // },
};

/**
 * Escape a value for safe use in HTML text and attribute values.
 * Needed because shortcode output isn't auto-escaped by Nunjucks, and titles can contain
 * characters like `&`, `"` and `'`.
 */
const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/**
 * Play icon (decorative - hidden from screen readers via `aria-hidden` on its wrapper).
 * Explicit width/height keep it small where CSS isn't applied (eg. RSS/Atom feed readers).
 * `focusable="false"` stops older browsers making the SVG a separate tab stop.
 */
const playIcon =
  '<svg width="24" height="24" viewBox="0 0 24 24" focusable="false"><path d="M8 5v14l11-7z"/></svg>';

/**
 * External-link icon for the "Watch on …" badge (decorative - the badge text says it all).
 * Same path as `src/_includes/components/core/icons/svg_inline/icon--external.njk`. It's an
 * outline icon, so it's drawn with a stroke (`fill="none"`, `stroke="currentColor"`) and
 * follows the badge's text colour. Explicit width/height keep it small in feed readers.
 */
const externalIcon =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>';

/**
 * Fetch the video's thumbnail at build time and generate self-hosted WebP + JPEG versions.
 *
 * - Tries each of the provider's thumbnail addresses in turn, best first.
 * - eleventy-img never upscales, so a 480px source simply skips the 960px width.
 * - Fetched images are cached for a year (in `.cache/`), matching the `photo` shortcode.
 * - Returns `null` if no thumbnail can be fetched (eg. the provider is unreachable during a
 *   build). The facade then renders without an image rather than failing the whole build.
 */
const getThumbnail = async (providerKey, videoId) => {
  let sources = [];
  try {
    sources = await providers[providerKey].thumbnailUrls(videoId);
  } catch {
    // A provider that looks its thumbnails up (eg. through an API) can fail. Fall through to
    // the warning below and render without a thumbnail, rather than failing the build
  }

  for (const src of sources) {
    try {
      return await Image(src, {
        widths: [480, 960],
        formats: ['webp', 'jpeg'],
        urlPath: '/assets/images/videos/',
        outputDir: './dist/assets/images/videos/',
        // Readable, predictable filenames, eg. `youtube-nsekqm6eaD8-960.webp`
        filenameFormat: (hash, source, width, format) =>
          `${providerKey}-${videoId}-${width}.${format}`,
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
    } catch {
      // This thumbnail isn't available (or the fetch failed) - try the next one
    }
  }

  console.warn(
    `[video facade] No ${providers[providerKey].name} thumbnail available for "${videoId}". Rendering the facade without one.`,
  );
  return null;
};

/**
 * The `video` shortcode: build a video facade's HTML, for any provider in `providers`.
 * Registered in `.eleventy.js`, eg. `{% video "youtube", "nsekqm6eaD8", "Video title", 144 %}`.
 *
 * @param {string} providerKey - Which entry in `providers` to use (eg. `youtube`)
 * @param {string} videoId - The provider's video ID (eg. the `v=` value in a YouTube URL)
 * @param {string} title - The video's title. Used for the accessible name, the player's
 *                         iframe `title`, and the caption link. Required for accessibility.
 * @param {number} [start] - Optional start time in seconds
 * @returns {Promise<string>} The facade's HTML
 */
export const videoFacade = async (providerKey, videoId, title, start) => {
  // Only the table's own entries count, so a name like "constructor" can't be mistaken for one
  const provider = Object.hasOwn(providers, providerKey)
    ? providers[providerKey]
    : undefined;

  // Fail loudly at build time rather than publishing a broken or unlabelled video
  // The provider comes first, so a missing one (eg. `{% video "nsekqm6eaD8", "Title" %}`) shows
  // up here too. The message lists the providers that are switched on, and the expected order.
  if (!provider) {
    throw new Error(
      `[video facade] Unknown video provider "${providerKey}". Use one of: ${Object.keys(providers).join(', ')}, eg. {% video "youtube", "id", "Title" %}.`,
    );
  }
  if (!videoId || !title) {
    throw new Error(
      `[video facade] Both a ${provider.name} video ID and a title are required.`,
    );
  }

  const startSeconds = Number.parseInt(start, 10) || 0;
  const safeTitle = escapeHtml(title);
  const watchUrl = escapeHtml(provider.watchUrl(videoId, startSeconds));

  const metadata = await getThumbnail(providerKey, videoId);
  const thumbnail = metadata
    ? Image.generateHTML(
        metadata,
        {
          class: 'video__thumbnail',
          alt: '', // Decorative: the link/button's own text already names the video
          sizes: '(min-width: 50em) 45em, 100vw', // Roughly the width of the content column
          loading: 'lazy', // Videos sit below the fold, so don't compete with the page's main content
          decoding: 'async',
        },
        { whitespaceMode: 'inline' },
      )
    : '';

  // Everything `<video-facade>` needs to build the player, as the element's own attributes.
  // `provider` picks the matching details from the script's `providers` table.
  // It's `video-title` rather than `title`, because `title` is a built-in attribute that would
  // show the title as a tooltip whenever the video is hovered.
  const playerAttributes = [
    `provider="${escapeHtml(providerKey)}"`,
    `video-id="${escapeHtml(videoId)}"`,
    `video-title="${safeTitle}"`,
    startSeconds ? `start="${startSeconds}"` : '',
  ]
    .filter(Boolean)
    .join(' ');

  /**
   * Markup notes:
   * - Joined onto a single line with no blank lines, so markdown-it treats the whole thing as
   *   one HTML block (a blank line would end the block and break the markup).
   * - No wrapper `<div>`s: the `<figure>` groups the video with its caption, and the
   *   `<video-facade>` element is itself the 16:9 box (`aspect-ratio` in `_videos.scss`). The link
   *   (and later the button and the player) stay its direct children and fill it.
   * - Heads-up that this link leaves the site: without JS, clicking the facade goes to the
   *   provider's site, so the visible "Watch on …" badge says so. The link's accessible name
   *   is the badge text plus the visually hidden title (eg. "Watch on YouTube: TITLE"), with the
   *   visible text first so voice-control users can say what they see. It's the same name as
   *   the caption's link, which goes to the same URL.
   * - With JS, `videoFacade.mjs` turns the link into a button that plays the video in place,
   *   removes the badge, and relabels `.video__label` to "Play video: TITLE".
   * - The caption tells visitors that playing the video involves the provider (UK GDPR / PECR),
   *   and keeps a real link to the provider's site for anyone who prefers to watch it there.
   *   The title in that link is visually hidden so each "watch on …" link on a page
   *   (eg. /notes) has a unique accessible name, while the visible text stays first in the
   *   name for voice-control users.
   */
  return [
    '<figure class="video-embed">',
    `<video-facade ${playerAttributes}>`,
    `<a class="video__facade" href="${watchUrl}">`,
    thumbnail,
    `<span class="video__play" aria-hidden="true">${playIcon}</span>`,
    `<span class="video__badge">Watch on ${provider.name}${externalIcon}</span>`,
    `<span class="visually-hidden video__label">: ${safeTitle}</span>`,
    '</a>',
    '</video-facade>',
    '<figcaption class="video__caption">',
    `Plays from ${provider.name}, which may store data on your device. `,
    'See my <a href="/privacy#embedded-videos">privacy policy</a>, or ',
    `<a href="${watchUrl}" rel="external">watch on ${provider.name}<span class="visually-hidden">: ${safeTitle}</span></a>.`,
    '</figcaption>',
    '</figure>',
  ].join('');
};
