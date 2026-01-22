---
title: The Main Thread Is Not Yours
summary: Every millisecond your JavaScript runs is a millisecond borrowed from your users. Here's how to be a better guest on the main thread.
bookmarkExternal: https://denodell.com/blog/the-main-thread-is-not-yours
bookmarkLabel: denodell.com
bookmarkAuthor: Den Odell
date: 2026-01-22T12:11:27.631Z
updated: ""
location:
  locality: Crawley
  country_name: UK
category:
  - javaScript
  - performance
  - web development
  - frontend
  - browser
  - scripts
  - speed
  - ux
eleventyExcludeFromCollections: false
---

There's a lot of good stuff in this article from Den. Here are just a few excerpts that got my attention...

> Every millisecond you spend executing JavaScript is a millisecond the browser can’t spend responding to a click, updating a scroll position, or acknowledging that the user did just try to type something. When your code runs long, you’re not causing “jank” in some abstract technical sense; you’re ignoring someone who’s trying to talk to you.
>
> Because the main thread can only do one thing at a time, everything else waits while your JavaScript executes: clicks queue up, scrolls freeze, and keystrokes pile up hoping you’ll finish soon. If your code takes 50ms to respond nobody notices, but at 500ms the interface starts feeling sluggish, and after several seconds the browser may offer to kill your page entirely.

And...

> Before your application code runs a single line, your framework has already spent some of the user’s main thread budget on initialization, hydration, and virtual DOM reconciliation.

Such important reminders!
