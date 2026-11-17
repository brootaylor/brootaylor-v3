/**
 * YouTube facade - progressive enhancement
 * ==========================================
 *
 * Pairs with the `youtube` shortcode (`lib/shortcodes/youtube.js`).
 *
 * The server-rendered HTML is a plain link to the video on YouTube, which works without JS.
 * This script enhances it:
 * 1. Each facade link becomes a <button>, because with JS it performs an action on the page
 *    (play the video here) rather than navigating away. Links are for navigation; buttons
 *    are for actions.
 * 2. Clicking the button swaps it for the real YouTube player (privacy-enhanced
 *    `youtube-nocookie.com`), which starts playing straight away. As a backstop (see
 *    `ensurePlayback()`), we also ask the player to play once it reports it's ready, because
 *    YouTube's `autoplay=1` occasionally doesn't start on the first click in Chrome.
 * 3. The first time someone hovers or focuses a video, we "warm up" the connection to YouTube
 *    (`rel="preconnect"`), so the player tends to appear faster when they do click.
 *
 * Nothing is requested from YouTube until step 3 or step 2 happens.
 * Loaded on demand from `main-modules.mjs`, only on pages that contain a video.
 */

// Privacy-enhanced embed domain - doesn't set YouTube cookies until the video is played
const embedOrigin = 'https://www.youtube-nocookie.com';

// The player loads resources from both of these, so warm up both connections
const preconnectOrigins = [embedOrigin, 'https://www.youtube.com'];

// How long to keep trying to reach the player before giving up. If we give up, nothing breaks:
// the player is still there and can be started with its own play button.
const playerHandshakeTimeout = 15000;

/**
 * Add `<link rel="preconnect">` hints for YouTube.
 * Lets the browser do the DNS lookup and TLS handshake early, so the player loads faster once
 * clicked. Only ever runs once per page (see the AbortController in `youtubeFacade()`).
 */
function warmUpConnections() {
  preconnectOrigins.forEach((origin) => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = origin;
    document.head.append(link);
  });
}

/**
 * Replace a facade link with an equivalent <button>.
 * Moves the link's existing children (thumbnail, play icon, label) across, so the button
 * looks the same.
 *
 * The link and the button do different things, so they're labelled differently:
 * - Link (no JS): leaves the site, so it shows a "Watch on YouTube" badge and is named
 *   "Watch on YouTube: TITLE".
 * - Button (here): plays the video in place, so the badge is removed and the hidden label
 *   becomes "Play video: TITLE".
 *
 * The caption's separate "watch on YouTube" link is left as a link, so opening the video
 * on YouTube (eg. in a new tab) is still possible.
 */
function upgradeToButton(link) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = link.className;
  Object.assign(button.dataset, link.dataset); // data-youtube-id / -title / -start
  button.append(...link.childNodes);

  button.querySelector('.video__badge')?.remove();
  const label = button.querySelector('.video__label');
  if (label) {
    label.textContent = `Play video: ${button.dataset.youtubeTitle}`;
  }

  link.replaceWith(button);
}

/**
 * Backstop for autoplay: tell the player to play as soon as it's ready.
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
function ensurePlayback(iframe) {
  const listeners = new AbortController();
  let handshakeTimer;

  const sendToPlayer = (message) => {
    iframe.contentWindow?.postMessage(
      JSON.stringify({ ...message, id: 1, channel: 'widget' }),
      embedOrigin, // Only deliver to YouTube's embed origin, never to anything else in the frame
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
        event.origin !== embedOrigin
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
 * Swap a facade button for the real YouTube player.
 * Focus moves into the new iframe, because the button the user just activated (and which had
 * focus) no longer exists. Without this, keyboard and screen reader users would be dropped
 * back at the top of the page.
 */
function loadPlayer(button) {
  const { youtubeId, youtubeTitle, youtubeStart } = button.dataset;

  const params = new URLSearchParams({
    // Fine here: playback is in direct response to the user pressing play
    autoplay: '1',
    // Lets `ensurePlayback()` talk to the player. `origin` tells the player which page it may
    // send its messages to.
    enablejsapi: '1',
    origin: window.location.origin,
  });
  if (youtubeStart) {
    params.set('start', youtubeStart);
  }

  const iframe = document.createElement('iframe');
  iframe.src = `${embedOrigin}/embed/${encodeURIComponent(youtubeId)}?${params}`;
  iframe.title = youtubeTitle; // An iframe's `title` is its accessible name
  iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
  // Fullscreen is granted here rather than via `fullscreen` in `allow` above. Setting both
  // makes Chrome warn that `allow` takes precedence. `allowfullscreen` is what YouTube's own
  // embed code uses, and is supported by every browser.
  iframe.allowFullscreen = true;

  ensurePlayback(iframe); // Set up before the iframe is added, so its `load` event isn't missed
  button.replaceWith(iframe);
  iframe.focus();
}

/**
 * Initialise every video facade on the page.
 * Uses delegated listeners on `document` (one listener each, however many videos there are).
 */
export default function youtubeFacade() {
  document.querySelectorAll('a.video__facade').forEach(upgradeToButton);

  // Play: load the player when a facade button is clicked (also fires for Enter/Space)
  document.addEventListener('click', (event) => {
    const button = event.target.closest('button.video__facade');
    if (button) {
      loadPlayer(button);
    }
  });

  // Warm-up: the first hover or keyboard focus on any facade preconnects to YouTube,
  // then both listeners remove themselves via the AbortController.
  const warmUpListeners = new AbortController();
  const handleIntent = (event) => {
    if (event.target.closest('.video__facade')) {
      warmUpConnections();
      warmUpListeners.abort();
    }
  };
  document.addEventListener('pointerover', handleIntent, {
    signal: warmUpListeners.signal,
  });
  document.addEventListener('focusin', handleIntent, {
    signal: warmUpListeners.signal,
  });
}
