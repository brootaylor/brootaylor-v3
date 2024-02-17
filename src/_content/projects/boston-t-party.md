---
title: Boston T Party
# Populates the `meta description` for a page as well as the project landing page project-specific summary
summary: A fast customer informational website for Boston T Party in South Africa.
# Populates the opening / `lead` text on a page
lead:
  - A fast customer informational <abbr title="Progressive Web App.">PWA</abbr> website for Boston T Party in South Africa.

project:
  year: 2022
  role: Frontend Web Design & Development
  technologies: HTML5, CSS, SCSS, JavaScript, Service Worker, PWA manifest, Eleventy, Nunjucks, Jest, Rollup.js, Node.js, GitHub, Netlify, Photoshop.
  order: 6

# Image component rules / properties for projects list page
# #######################################################
image:
  # The projects landing list page uses the `srcWebp` and `srcJpg` values
  srcWebp: "/assets/images/projects/boston-t-party/bostontparty_01--thumbnail.webp"
  srcJpg: "/assets/images/projects/boston-t-party/bostontparty_01--thumbnail.jpg"
  alt: "A screenshot of ECARX's software services website page"
  width: 650
  height: 464
  # Should the image thumbnail on the list page lazy load?
  lazyLoad: true

date: 2024-02-14T18:37:27.631Z

eleventyExcludeFromCollections: false
---

{% from "components/core/images/images.njk" import imageNormal %}
{% from "components/core/images/images.njk" import imageFigure %}

{{ imageFigure(
  "/assets/images/projects/boston-t-party/bostontparty-homepage_01.jpg",
  "A screenshot of the ECARX software services website page",
  "1200",
  "972",
  "ECARX software services website page",
  false,
  "shadow",
  "lazy")
}}

Developed a high speed PWA website tailored for Boston T Party, emphasising performance and resilience through progressive enhancement and offline caching techniques.

This was particularly crucial considering the limited connectivity, data and bandwidth availability in South Africa.

The website can be viewed at [bostontparty.co.za](https://bostontparty.co.za/)

*[PWA]: Progressive Web App.
