/**
 * `<video-facade>` custom element - click-to-load embedded videos, progressive enhancement
 * =========================================================================================
 *
 * A lightweight stand-in ("facade") for a third-party video player, such as YouTube's. The real
 * player is only loaded when someone presses play. Each provider's own details live in the
 * `providers` table below; everything else works the same for any provider. YouTube is the
 * only provider switched on for now. There's a commented-out Vimeo entry in the table as an example.
 *
 * Pairs with `lib/shortcodes/videoFacade.js` (the `{% video %}` shortcode), which outputs:
 *
 *   <video-facade provider="youtube" video-id="…" video-title="…" start="…">
 *     <a class="video__facade" href="https://www.youtube.com/watch?v=…">…</a>
 *   </video-facade>
 *
 * The server-rendered HTML is a plain link to the video on the provider's site, which works
 * without JS. Once this script defines the element, each video enhances itself:
 * 1. Its facade link becomes a <button>, because with JS it performs an action on the page
 *    (play the video here) rather than navigating away. Links are for navigation; buttons
 *    are for actions.
 * 2. Clicking the button swaps it for the provider's real player (for YouTube, the
 *    privacy-enhanced `youtube-nocookie.com`), which starts playing straight away. Providers
 *    can add a backstop to make sure playback starts (see `ensureYoutubePlayback()`).
 * 3. The first time someone hovers or focuses a video, we "warm up" the connections to that
 *    provider (`rel="preconnect"`), so the player tends to appear faster when they do click.
 *
 * Nothing is requested from the provider until step 3 or step 2 happens.
 *
 * Why a custom element: each video sets itself up and keeps its own listeners, rather than one
 * script sweeping the page and listening on `document`. A few deliberate choices:
 * - No shadow DOM. Everything stays ordinary page markup, so the site's own styles
 *   (`_videos.scss`) keep working and the no-JS link is the same markup.
 * - No "hide until defined" CSS (`:not(:defined)`). Before this script runs, the element holds a
 *   working link, so there's nothing that needs hiding.
 * - No `observedAttributes`. The attributes are set at build time and never change, so there's
 *   nothing to react to.
 *
 * Native, self-hosted video deliberately isn't handled here. A plain
 * `<video controls preload="none" loading="lazy" poster="…">` (see `components/core/videos/videos.njk`)
 * loads nothing but its poster until play is pressed, has native controls, and involves no third
 * party, so it needs no facade.
 *
 * Loaded on demand from `main-modules.mjs`, only on pages that contain a video.
 */

// YouTube's privacy-enhanced embed domain - doesn't set YouTube cookies until the video is played
const youtubeEmbedOrigin = 'https://www.youtube-nocookie.com';

// How long to keep trying to reach the player before giving up. If we give up, nothing breaks:
// the player is still there and can be started with its own play button.
const playerHandshakeTimeout = 15000;

/**
 * Backstop for YouTube's autoplay: tell the player to play as soon as it's ready.
 *
 * `autoplay=1` usually starts the video by itself, but occasionally (first click, desktop
 * Chrome) the player loads and just sits there showing its own play button. This uses the
 * messaging channel YouTube's embed player already supports (enabled with `enablejsapi=1`)
 * to send it a `playVideo` command once it says it's ready. If the video is already playing,
 * the command does nothing.
 *
 * No YouTube script is loaded on this page (the CSP only lets the player in as a frame) - it's
 * just `postMessage` between this page and the player iframe, following YouTube's own iframe
 * API protocol:
 * 1. We send `listening` until the player replies, to subscribe to its events.
 * 2. The player sends `onReady` when it can accept commands.
 * 3. We send the `playVideo` command, then stop listening.
 */
function ensureYoutubePlayback(iframe) {
  const listeners = new AbortController();
  let handshakeTimer;

  const sendToPlayer = (message) => {
    iframe.contentWindow?.postMessage(
      JSON.stringify({ ...message, id: 1, channel: 'widget' }),
      youtubeEmbedOrigin, // Only deliver to YouTube's embed origin, never to anything else in the frame
    );
  };

  const stopListening = () => {
    clearInterval(handshakeTimer);
    listeners.abort();
  };

  window.addEventListener(
    'message',
    (event) => {
      // Only trust messages from this exact player iframe, sent from YouTube's embed origin.
      // A fixed-origin comparison is enough here, and checking `event.source` as well means
      // another frame on the page can't pretend to be this player.
      if (
        event.source !== iframe.contentWindow ||
        event.origin !== youtubeEmbedOrigin
      ) {
        return;
      }
      if (typeof event.data !== 'string') {
        return;
      }

      let data;
      try {
        data = JSON.parse(event.data);
      } catch {
        return; // Not one of the player's JSON messages
      }

      // Any reply means the player has heard us, so stop repeating `listening`
      clearInterval(handshakeTimer);

      if (data.event === 'onReady') {
        sendToPlayer({ event: 'command', func: 'playVideo', args: [] });
        stopListening();
      }
    },
    { signal: listeners.signal },
  );

  // Once the iframe has loaded, keep announcing that we're listening until the player replies
  iframe.addEventListener(
    'load',
    () => {
      sendToPlayer({ event: 'listening' });
      handshakeTimer = setInterval(
        () => sendToPlayer({ event: 'listening' }),
        250,
      );
    },
    { once: true, signal: listeners.signal },
  );

  // Give up quietly if the player never replies (eg. YouTube is slow or blocked)
  setTimeout(stopListening, playerHandshakeTimeout);
}

/**
 * Each provider's own details. Everything else in this file works the same for any provider.
 * To add one (eg. Vimeo): add an entry here and in the build-side `providers` table in
 * `lib/shortcodes/videoFacade.js` (thumbnail, watch link, name), and allow its player in the
 * CSP's `frame-src` (`lib/utils/headers/contentSecurityPolicy.js`). No new shortcode is needed:
 * `{% video "vimeo", … %}` picks it up. There's a commented-out Vimeo entry below as an example.
 */
const providers = {
  youtube: {
    // The player loads resources from both of these, so warm up both connections
    preconnectOrigins: [youtubeEmbedOrigin, 'https://www.youtube.com'],

    // The player's address
    embedUrl({ videoId, start }) {
      const params = new URLSearchParams({
        autoplay: '1', // Fine here: playback is in direct response to the user pressing play
        enablejsapi: '1', // Lets the autoplay backstop (`ensureYoutubePlayback()`) talk to the player
        origin: window.location.origin, // Which page the player may send its messages to
      });
      if (start) {
        params.set('start', start);
      }
      return `${youtubeEmbedOrigin}/embed/${encodeURIComponent(videoId)}?${params}`;
    },

    // Optional: a provider-specific way to make sure playback starts (see the function's comment)
    ensurePlayback: ensureYoutubePlayback,
  },

  // PLACEHOLDER: Vimeo - NOT switched on, and untested. See the Vimeo entry in
  // `lib/shortcodes/videoFacade.js` for everything else that's needed first. It has to stay
  // commented out until then: switched on here alone, the CSP would block Vimeo's player.
  // vimeo: {
  //   // Vimeo's player. Check in the browser's Network panel which other domains it loads from,
  //   // and add any worth warming up here.
  //   preconnectOrigins: ['https://player.vimeo.com'],
  //
  //   embedUrl({ videoId, start }) {
  //     const params = new URLSearchParams({
  //       autoplay: '1', // Fine here: playback is in direct response to the user pressing play
  //       dnt: '1', // "Do not track": stops the player collecting session data and analytics
  //     });
  //     // The start time is a `#t=` fragment, so it goes after the query string
  //     return `https://player.vimeo.com/video/${encodeURIComponent(videoId)}?${params}${start ? `#t=${start}s` : ''}`;
  //   },
  //
  //   // No `ensurePlayback`: it's optional. Add one only if Vimeo's autoplay turns out to need a
  //   // backstop, using Vimeo's own player messages (not YouTube's).
  // },
};

// Providers whose connections have already been warmed up, so their preconnect hints are only
// ever added once per page, however many of their videos it has
const providersWarmedUp = new Set();

/**
 * Add `<link rel="preconnect">` hints for a provider.
 * Lets the browser do the DNS lookup and TLS handshake early, so the player loads faster once
 * clicked. Only ever runs once per provider per page (see `providersWarmedUp` above).
 */
function warmUpConnections(provider) {
  if (providersWarmedUp.has(provider)) {
    return;
  }
  providersWarmedUp.add(provider);

  provider.preconnectOrigins.forEach((origin) => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = origin;
    document.head.append(link);
  });
}

/**
 * Replace a video's facade link with an equivalent <button>.
 * Moves the link's existing children (thumbnail, play icon, label) across, so the button
 * looks the same.
 *
 * The link and the button do different things, so they're labelled differently:
 * - Link (no JS): leaves the site, so it shows a "Watch on …" badge (eg. "Watch on YouTube")
 *   and is named "Watch on …: TITLE".
 * - Button (here): plays the video in place, so the badge is removed and the hidden label
 *   becomes "Play video: TITLE".
 *
 * The caption's separate "watch on …" link is left as a link, so opening the video on the
 * provider's site (eg. in a new tab) is still possible.
 */
function upgradeToButton(player, link) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = link.className;
  button.append(...link.childNodes);

  button.querySelector('.video__badge')?.remove();
  const label = button.querySelector('.video__label');
  if (label) {
    label.textContent = `Play video: ${player.getAttribute('video-title')}`;
  }

  link.replaceWith(button);
}

/**
 * Swap a video's facade button for the provider's real player.
 * Focus moves into the new iframe, because the button the user just activated (and which had
 * focus) no longer exists. Without this, keyboard and screen reader users would be dropped
 * back at the top of the page.
 */
function loadPlayer(player, button, provider) {
  const iframe = document.createElement('iframe');
  iframe.src = provider.embedUrl({
    videoId: player.getAttribute('video-id'),
    start: player.getAttribute('start'),
  });
  iframe.title = player.getAttribute('video-title'); // An iframe's `title` is its accessible name
  iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
  // Fullscreen is granted here rather than via `fullscreen` in `allow` above. Setting both
  // makes Chrome warn that `allow` takes precedence. `allowfullscreen` is what YouTube's own
  // embed code uses, and is supported by every browser.
  iframe.allowFullscreen = true;

  // Set up before the iframe is added, so its `load` event isn't missed
  provider.ensurePlayback?.(iframe);
  button.replaceWith(iframe);
  iframe.focus();
}

// Videos that have already been set up. `connectedCallback` runs again if an element is ever
// moved around the page, so this makes sure each video is only set up once.
// It's a WeakSet that only this module can reach, rather than a private `#field` on the class,
// so the script still runs in the older browsers on the support list (eg. KaiOS 3), which
// predate private class syntax (Chrome 84, Firefox 90, Safari 15).
const playersSetUp = new WeakSet();

class VideoFacade extends HTMLElement {
  connectedCallback() {
    // `:scope >` only matches the facade link that's a direct child of this element
    const link = this.querySelector(':scope > a.video__facade');
    const providerName = this.getAttribute('provider');
    // Only the table's own entries count, so a name every object inherits (eg. "constructor")
    // can't be mistaken for a provider. `Object.hasOwn()` would be neater, but it's newer than
    // some browsers on the support list (eg. KaiOS 3)
    const provider = Object.prototype.hasOwnProperty.call(
      providers,
      providerName,
    )
      ? providers[providerName]
      : undefined;

    // An unknown (or missing) provider is left as it is: a working link to the video
    if (playersSetUp.has(this) || !link || !provider) {
      return;
    }
    playersSetUp.add(this);

    upgradeToButton(this, link);

    // The listeners sit on this element rather than on `document`, so they go away with it
    // and there's nothing to clean up.
    // Play: load the player when the facade button is clicked (also fires for Enter/Space)
    this.addEventListener('click', (event) => {
      const button = event.target.closest('button.video__facade');
      if (button) {
        loadPlayer(this, button, provider);
      }
    });

    // Warm-up: the first hover or keyboard focus preconnects to the provider. Each listener
    // removes itself after one go, and `warmUpConnections()` only does anything the first time
    // for each provider.
    this.addEventListener('pointerover', () => warmUpConnections(provider), {
      once: true,
    });
    this.addEventListener('focusin', () => warmUpConnections(provider), {
      once: true,
    });
  }
}

export default function defineVideoFacade() {
  // Guard against defining it twice, which would throw an error
  if (!customElements.get('video-facade')) {
    customElements.define('video-facade', VideoFacade);
  }
}
