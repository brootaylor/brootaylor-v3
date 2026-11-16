import Image from '@11ty/eleventy-img';

/**
 * YouTube video facade (click-to-load)
 * =======================================
 *
 * Usage (in Markdown or Nunjucks):
 *   {% youtube "nsekqm6eaD8", "Video title" %}
 *   {% youtube "flsgJe8mN-A", "Video title", 144 %}   <- optional start time, in seconds
 *
 * WHY:
 * A raw YouTube <iframe> downloads the whole YouTube player (~1MB of JS) on page load, and lets
 * YouTube/Google receive the visitor's IP and store data on their device before they've chosen
 * to watch anything. This shortcode renders a lightweight stand-in (a "facade") instead.
 *
 * HOW (progressive enhancement):
 * 1. Baseline (no JS, feed readers, legacy browsers):
 *    A self-hosted thumbnail + play icon, wrapped in a normal link to the video on YouTube,
 *    with a visible "Watch on YouTube" badge so it's clear the link leaves the site.
 * 2. Enhanced (JS available):
 *    `src/scripts/components/youtubeFacade.mjs` swaps the link for a <button> that loads the
 *    YouTube player in place, only when it's clicked.
 *
 * The thumbnail is fetched from YouTube ONCE at build time and saved alongside the site's own
 * images, so visitors never request anything from YouTube until they press play.
 */

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
 * External-link icon for the "Watch on YouTube" badge (decorative - the badge text says it all).
 * Same path as `src/_includes/components/core/icons/svg_inline/icon--external.njk`. It's an
 * outline icon, so it's drawn with a stroke (`fill="none"`, `stroke="currentColor"`) and
 * follows the badge's text colour. Explicit width/height keep it small in feed readers.
 */
const externalIcon =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>';

/**
 * Fetch the video's thumbnail at build time and generate self-hosted WebP + JPEG versions.
 *
 * - YouTube's best thumbnail (`maxresdefault`, 1280x720) doesn't exist for every video,
 *   so fall back to `hqdefault` (480x360, letterboxed - the CSS crops the black bars off).
 * - eleventy-img never upscales, so a 480px source simply skips the 960px width.
 * - Fetched images are cached for a year (in `.cache/`), matching the `photo` shortcode.
 * - Returns `null` if no thumbnail can be fetched (eg. YouTube unreachable during a build).
 *   The facade then renders without an image rather than failing the whole build.
 */
const getThumbnail = async (videoId) => {
  const sources = ['maxresdefault', 'hqdefault'].map(
    (name) => `https://i.ytimg.com/vi/${videoId}/${name}.jpg`,
  );

  for (const src of sources) {
    try {
      return await Image(src, {
        widths: [480, 960],
        formats: ['webp', 'jpeg'],
        urlPath: '/assets/images/videos/',
        outputDir: './dist/assets/images/videos/',
        // Readable, predictable filenames, eg. `youtube-nsekqm6eaD8-960.webp`
        filenameFormat: (hash, source, width, format) =>
          `youtube-${videoId}-${width}.${format}`,
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
      // This thumbnail size isn't available (or the fetch failed) - try the next one
    }
  }

  console.warn(
    `[youtube shortcode] No thumbnail available for "${videoId}". Rendering the facade without one.`,
  );
  return null;
};

/**
 * The shortcode itself.
 *
 * @param {string} videoId - The YouTube video ID (the `v=` value in a YouTube URL)
 * @param {string} title - The video's title. Used for the accessible name, the player's
 *                         iframe `title`, and the caption link. Required for accessibility.
 * @param {number} [start] - Optional start time in seconds
 * @returns {Promise<string>} The facade's HTML
 */
export const youtube = async (videoId, title, start) => {
  // Fail loudly at build time rather than publishing an unlabelled video
  if (!videoId || !title) {
    throw new Error(
      '[youtube shortcode] Both a video ID and a title are required.',
    );
  }

  const startSeconds = Number.parseInt(start, 10) || 0;
  const safeTitle = escapeHtml(title);

  // The no-JS destination: the video on YouTube itself, at the right start time
  const watchUrl = escapeHtml(
    `https://www.youtube.com/watch?v=${videoId}${startSeconds ? `&t=${startSeconds}s` : ''}`,
  );

  const metadata = await getThumbnail(videoId);
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

  // Everything the enhancement script needs to build the player
  const dataAttributes = [
    `data-youtube-id="${escapeHtml(videoId)}"`,
    `data-youtube-title="${safeTitle}"`,
    startSeconds ? `data-youtube-start="${startSeconds}"` : '',
  ]
    .filter(Boolean)
    .join(' ');

  /**
   * Markup notes:
   * - Joined onto a single line with no blank lines, so markdown-it treats the whole thing as
   *   one HTML block (a blank line would end the block and break the markup).
   * - Reuses the existing `.video` / `.video--inner` 16:9 ratio box.
   * - Heads-up that this link leaves the site: without JS, clicking the facade goes to
   *   youtube.com, so the visible "Watch on YouTube" badge says so. The link's accessible name
   *   is the badge text plus the visually hidden title ("Watch on YouTube: TITLE"), with the
   *   visible text first so voice-control users can say what they see. It's the same name as
   *   the caption's link, which goes to the same URL.
   * - With JS, `youtubeFacade.mjs` turns the link into a button that plays the video in place,
   *   removes the badge, and relabels `.video__label` to "Play video: TITLE".
   * - The caption tells visitors that playing the video involves YouTube (UK GDPR / PECR),
   *   and keeps a real link to YouTube for anyone who prefers to watch it there.
   *   The title in that link is visually hidden so each "watch on YouTube" link on a page
   *   (eg. /notes) has a unique accessible name, while the visible text stays first in the
   *   name for voice-control users.
   */
  return [
    '<figure class="video-embed">',
    '<div class="video"><div class="video--inner">',
    `<a class="video__facade" href="${watchUrl}" ${dataAttributes}>`,
    thumbnail,
    `<span class="video__play" aria-hidden="true">${playIcon}</span>`,
    `<span class="video__badge">Watch on YouTube${externalIcon}</span>`,
    `<span class="visually-hidden video__label">: ${safeTitle}</span>`,
    '</a>',
    '</div></div>',
    '<figcaption class="video__caption">',
    'Plays from YouTube, which may store data on your device. ',
    'See my <a href="/privacy#embedded-videos">privacy policy</a>, or ',
    `<a href="${watchUrl}" rel="external">watch on YouTube<span class="visually-hidden">: ${safeTitle}</span></a>.`,
    '</figcaption>',
    '</figure>',
  ].join('');
};
