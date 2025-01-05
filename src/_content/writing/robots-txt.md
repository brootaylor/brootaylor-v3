---
title: Robots.txt
summary: Just over 18 months ago, there were a bunch of conversations on the web talking about how you can disallow OpenAI from indexing your personal website using a robots.txt file.
date: 2025-01-01T17:42:36.671Z
updated: ''
location:
  locality: Crawley
  country_name: UK
category:
  - llm
  - ai
  - tech
  - web
  - content
  - copyright
  - robots
  - ethics
eleventyExcludeFromCollections: false
---

Just over 18 months ago, there were a bunch of conversations on the web talking about how you can disallow OpenAI from indexing your personal website using a `robots.txt` file.

```txt
User-agent: GPTBot
Disallow: /
```

"Ah!" I thought, "I should do that too!".

Thinking I'd be clever and (*of course*) outsmart all the LLM bots that were crawling the web... I did. I even spent the time [writing a little bit of code](https://github.com/brootaylor/brootaylor-v3/blob/main/src/robots.njk) to look through a [JSON file of bots](https://github.com/brootaylor/brootaylor-v3/blob/main/src/_data/bots.json) and generate the `robots.txt` file for me.

Coupled with my all too trusting (gullible) nature, I thought I'd be able to keep my site out of the clutches of the AI overlords.

Fast forward to today and my outputted `robots.txt` file looks something like this...

```txt
User-agent: AdsBot-Google
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: AI2Bot
Disallow: /

User-agent: Alexabot
Disallow: /

User-agent: Amazonbot
Disallow: /

User-agent: Applebot
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: AwarioRssBot
Disallow: /

User-agent: AwarioSmartBot
Disallow: /

User-agent: Baiduspider-image
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: ChatGPT
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Claude-Web
Disallow: /

User-agent: cohere-ai
Disallow: /

User-agent: cohere-training-data-crawler
Disallow: /

User-agent: DataForSeoBot
Disallow: /

User-agent: Diffbot
Disallow: /

User-agent: dotbot
Disallow: /

User-agent: Exabot
Disallow: /

User-agent: FacebookBot
Disallow: /

User-agent: Googlebot-Image
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: GPTBot
Disallow: /

User-agent: ImagesiftBot
Disallow: /

User-agent: Kangaroo Bot
Disallow: /

User-agent: magpie-crawler
Disallow: /

User-agent: Mediapartners-Google
Disallow: /

User-agent: Meta-ExternalAgent
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: OAI-SearchBot
Disallow: /

User-agent: omgili
Disallow: /

User-agent: Omgilibot
Disallow: /

User-agent: PanguBot
Disallow: /

User-agent: peer39_crawler
Disallow: /

User-agent: PerplexityBot
Disallow: /

User-agent: PetalBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: Timpibot
Disallow: /

User-agent: Webzio-Extended
Disallow: /

User-agent: YouBot
Disallow: /
```

And this is just a *select list* of bots I've attempted to block. If you'd like to have a peak at the growing pile of bots that are crawling the web, you can take a [look at this list](https://darkvisitors.com/agents). {.call-out .mb-xlg}

Well, it seems it doesn't make a blind bit of difference. Dennis Schubert [posted about it](https://pod.geraspora.de/posts/17342163) a few days ago showing that... "They also don’t give a single flying fuck about `robots.txt`, because why should they."

I'm also reminded of what [Jeremy Keith wrote](https://adactio.com/links/20380)...

> Now that the horse has bolted—and ransacked the web—you can shut the barn door.

Sigh.

Seeing as I use Netlify to deploy my websites, maybe I'll take a look at [Phil Hawksworth's suggested method](https://developers.netlify.com/guides/blocking-ai-bots-and-controlling-crawlers/) for tackling this plague.

Wish me luck!
