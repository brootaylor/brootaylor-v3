---
title: Ai & Alignment
summary: Ai & Alignment.
bookmarkExternal: https://chriscoyier.net/2026/04/25/ai-alignment/
bookmarkLabel: chriscoyier.net
bookmarkAuthor: Chris Coyier
date: 2026-05-09T12:57:27.631Z
updated: ""
location:
  locality: Crawley
  country_name: UK
category:
  - technologys
  - industry
  - ai
  - alignment
eleventyExcludeFromCollections: false
---

Alignment being the bottleneck. Yup.

But not alignment as in getting the "Ai" aligned with human values etc. It's more about humans aligning with each other. As in, what we think should or shouldn't be built, how it should be built, and how it should be used.

And I don't think this necessarily needs to be seen as a bad thing. It can often prove to be the much needed brakes at times when the accelerator is being pushed too hard. It can be a good thing to have a bit of friction in the system to help us slow down and think about what we're doing and why we're doing it.

Also, this seeming necessity on having to move fast, and this being perceived as the 'bottleneck'...

{% from "components/core/blockquotes/blockquotes.njk" import blockquote %}
{%- call blockquote('Andrew Murphy', citHref='https://andrewmurphy.io/blog/if-you-thought-the-speed-of-writing-code-was-your-problem-you-have-bigger-problems', citLabel='"f you thought the speed of writing code was your problem - you have bigger problems"') -%}
Your developers are producing PRs faster than ever. Great. Wonderful. Gold star. Someone get the confetti cannon. Now those PRs hit the review queue, and your reviewers haven't tripled. Nobody tripled the reviewers. Nobody even thought about the reviewers, because the reviewers weren't in the vendor's slide deck.

So PRs sit. A day. Two days. A week. The author has context-switched to their next AI-assisted feature and can barely remember what the first one did by the time review comments land. "Can you explain what this function does?" they ask, staring at code they wrote eight days ago, which in developer memory is roughly the Jurassic period.
{%- endcall %}
