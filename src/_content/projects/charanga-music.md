---
title: Charanga Music
# Populates the `meta description` for a page as well as the project landing page project-specific summary
summary: Charanga Music needed a front-end boilerplate / component library to help with future projects.
# Populates the opening / `lead` text on a page
lead:
  - Charanga Music needed a front-end boilerplate / component library to help with future projects.

# Social image details - (Is used by channels like Facebook, Twitter, WhatsApp, LinkedIn etc.)
# ############################################################################################
socialImage:
  url: "/assets/images/projects/charanga-music/charanga-music_01--thumbnail.jpg"
  alt: "A screenshot of Charanga's homepage"

project:
  year: 2016
  role: Frontend Web Developer
  technologies: HTML5, CSS, SCSS, JavaScript, jQuery, Grunt, Git, Bitbucket
  order: 9

# Image component rules / properties for projects list page
# #######################################################
image:
  # The projects landing list page uses the `srcWebp` and `srcJpg` values
  srcWebp: "/assets/images/projects/charanga-music/charanga-music_01--thumbnail.webp"
  srcJpg: "/assets/images/projects/charanga-music/charanga-music_01--thumbnail.jpg"
  alt: "A screenshot of Charanga's homepage"
  width: 650
  height: 464
  # Should the image thumbnail on the list page lazy load?
  lazyLoad: true

date: 2024-02-21T11:49:27.631Z

eleventyExcludeFromCollections: false
---

{% from "components/core/images/images.njk" import imageNormal %}

{{ imageNormal(
  "/assets/images/projects/charanga-music/charanga-music--sml-screen_01.webp",
  "A screenshot of Charanga's homepage on a desktop monitor",
  "1200",
  "951",
  false,
  false,
  "lazy")
}}

I worked with Charanga Music to craft a versatile front-end boilerplate / component library, ensuring reusability, extensibility, responsiveness, and accessibility.

This streamlined their ability to swiftly develop and deploy future web offerings, maintaining top-notch front-end standards throughout the process.

---

{% from "components/core/blockquotes/blockquotes.njk" import blockquote %}
{%- call blockquote('Paul Davison, Head Of Design, Charanga Music') -%}
  We got Bruce in to to help us develop a front-end boilerplate / component library as we were inundated with projects and needed a safe pair of hands that could help us achieve quality results with minimal supervision.<br><br>
  Bruce delivered a high-quality framework that ticks all of the boxes for us. And to top it all he’s a great guy to work with, highly professional, he gets on well with everyone and really cares about his work. I would not hesitate to hire Bruce again.
{%- endcall %}
