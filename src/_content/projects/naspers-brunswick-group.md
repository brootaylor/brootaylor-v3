---
title: Naspers / Brunswick Group
# Populates the `meta description` for a page as well as the project landing page project-specific summary
summary: A microsite to support the release of Naspers PLC's annual financial information.
# Populates the opening / `lead` text on a page
lead:
  - A microsite to support the release of Naspers PLC's annual financial information.

project:
  year: 2022
  role: Frontend Web Developer
  technologies: HTML5, CSS, SCSS, JavaScript, Vue.JS, GSAP, Bootstrap 5, Webpack, Bitbucket, WordPress <em>(Headless CMS Config & Advanced Custom Fields)</em>, Photoshop, Figma, JIRA, Confluence.
  order: 5

# Image component rules / properties for projects list page
# #######################################################
image:
  # The projects landing list page uses the `srcWebp` and `srcJpg` values
  srcWebp: "/assets/images/projects/brunswick-group/naspers/naspers_01--thumbnail.webp"
  srcJpg: "/assets/images/projects/brunswick-group/naspers/naspers_01--thumbnail.jpg"
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
  "/assets/images/projects/brunswick-group/naspers/naspers-homepage_01.jpg",
  "A screenshot of the ECARX software services website page",
  "1200",
  "970",
  "Naspers 2022 Annual Report website homepage",
  false,
  "shadow",
  "lazy")
}}

Worked with a team of web developers to build this <abbr title="Single Page Application.">SPA</abbr> microsite using Vue.js. This was specifically to support Naspers 2022 annual financial report.
