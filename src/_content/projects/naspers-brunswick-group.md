---
title: Naspers / Brunswick Group
# Populates the `meta description` for a page as well as the project landing page project-specific summary
summary: Constructed a CMS driven SPA microsite to support the release of Naspers PLC's 2022 annual financial information.
# Populates the opening / `lead` text on a page
lead:
  - Constructed a <abbr title="Content Management System.">CMS</abbr> driven <abbr title="Single Page Application.">SPA</abbr> microsite to support the release of Naspers PLC's 2022 annual financial information.

# Social image details - (Is used by content sharing channels like Facebook, Twitter, WhatsApp, LinkedIn, RSS readers etc.)
# ##########################################################################################################################
socialImage:
  url: "/assets/images/projects/brunswick-group/naspers/naspers_01--thumbnail.jpg"
  alt: "A screenshot of Naspers 2022 Annual Report homepage"

project:
  year: 2022
  role: Frontend Web Developer
  technologies: HTML5, CSS, SCSS, JavaScript <em>(ES5 & ES6+)</em>, Vue.JS, GSAP, Bootstrap 5, Webpack, Bitbucket, WordPress <em>(Headless CMS Config & Advanced Custom Fields)</em>, Photoshop, Figma, JIRA, Confluence.
  order: 6

# Image component rules / properties for projects list page
# #######################################################
image:
  # The projects landing list page uses the `srcWebp` and `srcJpg` values
  srcWebp: "/assets/images/projects/brunswick-group/naspers/naspers_01--thumbnail.webp"
  srcJpg: "/assets/images/projects/brunswick-group/naspers/naspers_01--thumbnail.jpg"
  alt: "A screenshot of Naspers 2022 Annual Report homepage"
  width: 650
  height: 464
  # Should the image thumbnail on the list page lazy load?
  lazyLoad: true

date: 2025-05-12T19:51:27.631Z

eleventyExcludeFromCollections: false
---

{% from "components/core/images/images.njk" import imageNormal %}

{{ imageNormal(
  "/assets/images/projects/brunswick-group/naspers/naspers-homepage--sml-screen_01.webp",
  "A screenshot of Naspers 2022 Annual Report homepage on a desktop monitor",
  "1200",
  "951",
  false,
  false,
  "lazy")
}}

Collaborated with a team of web developers at Brunswick Group to construct a CMS-driven SPA microsite employing Vue.js, with WordPress serving as a headless CMS.

This specialised microsite was developed to support the Naspers 2022 annual financial report.

*[SPA]: Single Page Application.
*[CMS]: Content Management System.
