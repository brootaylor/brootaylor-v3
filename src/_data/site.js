import { DateTime } from 'luxon';

export default {
  name: 'Bruce Taylor',
  short_name: 'BWT',
  metaTitle: 'Bruce Taylor • Frontend Web Developer & UI Engineer',
  metaDescription: 'Bruce Taylor',
  metaImage: '/assets/images/common/broo-social-square-600.jpg',
  metaImageAlt: 'Profile picture of Bruce Taylor',
  logoAlt: 'Site logo for Bruce Taylor',
  lang: 'en-gb',
  start_url: '/',
  display: 'standalone',
  rootUrl: process.env.URL || '',
  environment: process.env.NODE_ENV,
  logo: '/assets/images/common/logo.png',
  theme_color_android: '#212227',
  theme_color_ios: '#212227',
  background_color_android: '#ffffff',
  background_color_mstile: '#212227',
  accent_color: '#212227',
  favicon: '/assets/ico/favicon.ico',
  icon: '/assets/ico/apple-touch-icon.png',
  icon_192: '/assets/ico/android-chrome-192x192.png',
  icon_512: '/assets/ico/android-chrome-512x512.png',
  icon_maskable_196: '/assets/ico/android-chrome-maskable-196x196.png', // Maskable icon for Android devices (https://web.dev/maskable-icon-audit/),
  icon_maskable_512: '/assets/ico/android-chrome-maskable-512x512.png', // Maskable icon for Android devices (https://web.dev/maskable-icon-audit/)
  icon_mstile: '/assets/ico/mstile-150x150.png',
  twitter: '@brootaylor', // Twitter handle
  robotsCrawl: true, // Allow search engine robots to crawl site
  aiCrawl: false, // Allow AI robots to crawl site and train AI models
  botHoneypot: true, // Honeypot hidden link added to DOM to catch bots
  analyticsUrchin: '', // Analytics urchin uses this value
  scriptsVendor: false, // If using vendor (ie. 3rd party) scripts
  scriptsMain: true, // If using any `main` scripts on the site (eg. carousel, objectfit polyfill etc.)
  scriptsServiceworker: true, // If using a service worker
  dateTimeNow: DateTime.local().toFormat('dd LLLL yyyy @ t'),
  timeCurrent: DateTime.local().diff(DateTime.local(1982, 5, 25)).milliseconds,
  siteMessage: false, // A message 'bar' appears on the pages
  siteTheme: 'theme-default', // Eg. if wanting to theme site to support Ukraine `theme-ukraine`
  socialMedia: [
    'https://www.linkedin.com/in/brootaylor',
    'https://bsky.app/profile/brootaylor.com',
    'https://mastodon.social/@brootaylor',
    'https://twitter.com/brootaylor',
    'https://github.com/brootaylor'
  ],
  author: {
    name: 'Bruce Taylor',
    job: 'Frontend Web Developer & UI Engineer',
    description: 'Bruce is a frontend web developer and UI engineer based in England. This is his blog and portfolio site.',
    url: 'https://brootaylor.com',
    thumbnail: 'https://brootaylor.com/assets/images/common/broo-social-square-600.jpg',
    email: 'brootaylor@gmail.com',
  },
};
