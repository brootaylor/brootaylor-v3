---
title: '"Ai" Bot Blocker'
summary: '"Ai" Bot Blocker. A little bit of fun and a middle finger up to the bots and their hubris-infested creators.'
# Populates the opening / `lead` text on a page
lead:
  - I wrote a post a few days ago about <a href="/writing/2025-01-01/robots-txt">my robots.txt file</a> &mdash; and how I thought I was being clever by disallowing OpenAI from indexing my personal website.
  - And how not-so-clever <em>(and naive)</em> of me it had turned out to be.
date: 2025-01-05T19:23:36.671Z
updated: 2026-11-17T16:11:44.000Z
location:
  locality: Crawley
  country_name: UK
category:
  - llm
  - ai
  - bots
  - tech
  - web
  - judo
  - honeypot
  - content
  - copyright
  - robots
  - ethics
eleventyExcludeFromCollections: false
---

***A little preamble...***

Ethan Marcotte wrote a post, "[Blockin' bots](https://ethanmarcotte.com/wrote/blockin-bots/)", last year. It was his attempt at trying to block the bots from scraping his site &mdash; but I was also struck by the frustration and sadness in his words. This has stuck with me.

He said things like:

> Well, I don’t like the idea of my work being hoovered up to train “AI” data models; I don’t like that these companies assume my content’s available to them by default, and that I have to opt out of their scraping; I really don’t want anything I write to support these platforms, which I find unethical, extractive, deeply amoral, and profoundly anti-human.
>
> [...] And as you might imagine, I really wish I didn’t have to think about any of this.
>
> [...] I should’ve known it wouldn’t be quite that easy! Capitalism is working fine! Computers were a mistake!

**Oh how this resonates with me** &mdash; and how hard it is not to end up in the weeds when writing a post like this. So many emotions rise to the surface. I will do my best to resist the urge to go off on a tangent as I'm here to share a little bit of what I did to try make it trickier for the bots to scrape my site.

At the end of [my last post](/writing/2025-01-01/robots-txt) I mentioned I may have a peek at [Phil Hawksworth's suggested method](https://developers.netlify.com/guides/blocking-ai-bots-and-controlling-crawlers/). Turns out it helped immensely and sparked a few ideas that I ended up implementing on my site.

So here it is...

---

## My offering

It's worth bearing in mind my 'stack' is Eleventy, Netlify and GitHub. The principles however should be applicable in most cases.

Here's the code it's made up of:

1. [`ai_agents.json`](https://github.com/brootaylor/brootaylor-v3/blob/main/src/_data/ai_agents.json) &mdash; Data file *(static for the time being)* that lists the bots I want to block. [Dark Visitors](https://darkvisitors.com/agents.json) is a great resource for listing the agents.
2. [`aiAgents.js`](https://github.com/brootaylor/brootaylor-v3/blob/main/netlify/edge-functions/aiAgents.js) &mdash; Server-side edge function that's triggered on every request to my site. It reads the `ai_agents.json` file and checks the user-agent of the incoming request. Among some other things this script does, if the user-agent matches one of the bots in the list, it returns a `403` status code.
3. [`robots.njk`](https://github.com/brootaylor/brootaylor-v3/blob/main/src/robots.njk) &mdash; Nunjucks template that reads the `ai_agents.json` file and generates the `robots.txt` file.
4. **Honeypot link** &mdash; A hidden link that's added dynamically to my site using a little bit of JavaScript. It's a link that's *(hopefully)* mostly only visible to naughty bots / dodgy agents. If the link is followed, they get a `403` response *(and my 403 page)* instead of the page.

The hidden 'honeypot' link is a little bit of a gamble and I'm not sure how effective it'll be. But it's a fun little experiment and I'm curious to see if it has any effect.

This is what the JavaScript generates in the DOM, just before the closing `</body>` tag:

```html
<a href="/honeypot" class="hidden" aria-hidden="true" tabindex="-1" rel="nofollow">Honeypot be this way</a>
```

If you're interested in the script that generates this link, here it is. It's a small JavaScript module, [`honeypot.mjs`](https://github.com/brootaylor/brootaylor-v3/blob/main/src/scripts/features/honeypot.mjs), that my main script imports and calls:

```js
export default function addHoneypotLink() {
  const honeypotLink = document.createElement('a');
  honeypotLink.href = '/honeypot';
  honeypotLink.textContent = 'Honeypot be this way';
  honeypotLink.classList.add('hidden');
  // Ensure screen readers ignore it
  honeypotLink.setAttribute('aria-hidden', 'true');
  // Prevent it from being focusable via keyboard navigation
  honeypotLink.tabIndex = -1;
  // Prevent search engines from following the link
  honeypotLink.rel = 'nofollow';
  document.body.append(honeypotLink);
}
```

**NOTE:** I decided to generate the hidden honeypot link using JavaScript &mdash; hopefully to make it less likely to be discovered by bots that don’t execute JavaScript. Essentially, the attempt is to set up a trap that only bots that understand JavaScript will fall into, while humans (who are unlikely to interact with such a link) won’t even notice it. {.call-out .mb-xlg}

---

## Update (November 2026)

A few things have changed since I first wrote this:

1. **The honeypot script** &mdash; It used to be an inline script. It now lives in its own little JavaScript module, which is the version shown above.
2. **The logs** &mdash; The edge function used to log the browser details and address of *every* visit to my site. Looking back, that was far more than I needed. Now it only logs the requests it actually blocks: an "Ai" crawler on my list, or something following the honeypot link. It doesn't log ordinary visits at all, so everything it does log is a bot that got caught.
3. **My `robots.txt`** &mdash; It now asks every crawler to stay away from the honeypot page (`Disallow: /honeypot`). Well behaved crawlers, like search engines, will never go near it. So anything that ends up there has ignored my `robots.txt` &mdash; which makes the honeypot a better trap.

---

## Final thoughts

It does feel crazy to have to go to these lengths to try and protect my content. But it's been interesting as well as a bit of fun giving it a go &mdash; and kinda feels more like a game of cat and mouse. I'll be keeping an eye on the logs in Netlify to see if it has any effect.

For the time being, here's a middle finger up to the bots and their hubris-infested creators. 🖕
