---
title: ECARX / Hugo & Cat
# Populates the `meta description` for a page as well as the project landing page project-specific summary
summary: Collaborated with Hugo & Cat to build a high-performance Umbraco website for ECARX, featuring advanced animation, interactivity, and a Storybook-powered component system.
# Populates the opening / `lead` text on a page
lead:
  - Collaborated with Hugo & Cat to build a high-performance Umbraco website for ECARX, featuring advanced animation, interactivity, and a Storybook-powered component system.

# Social image details - (Is used by content sharing channels like Facebook, Twitter, WhatsApp, LinkedIn, RSS readers etc.)
# ##########################################################################################################################
socialImage:
  url: "/assets/images/projects/hugo-and-cat/ecarx/ecarx_01--thumbnail.jpg"
  alt: "A screenshot of ECARX's homepage"

project:
  year: 2023
  role: Senior Frontend Web Developer
  technologies: HTML5, CSS, SCSS, JavaScript <em>(ES5 & ES6+)</em>, GSAP, Handlebars, Storybook, Webpack, Gulp, Cypress, Umbraco, .NET Razor Views, Azure DevOps, Figma
  websiteLabel: www.ecarxgroup.com
  websiteUrl: https://www.ecarxgroup.com/
  order: 2

# Image component rules / properties for projects list page
# #######################################################
image:
  # The projects landing list page uses the `srcWebp` and `srcJpg` values
  srcWebp: "/assets/images/projects/hugo-and-cat/ecarx/ecarx_01--thumbnail.webp"
  srcJpg: "/assets/images/projects/hugo-and-cat/ecarx/ecarx_01--thumbnail.jpg"
  alt: "A screenshot of ECARX's homepage"
  width: 650
  height: 464
  # Should the image thumbnail on the list page lazy load?
  lazyLoad: true

date: 2025-05-12T19:51:27.631Z

eleventyExcludeFromCollections: false
---

{% from "components/core/images/images.njk" import imageNormal %}

<picture>
  <source srcset="/assets/images/projects/hugo-and-cat/ecarx/ecarx-news--lg-screen_01.webp" type="image/webp" media="(min-width: 768px)">
  <img src="/assets/images/projects/hugo-and-cat/ecarx/ecarx-news--sml-screen_01.webp" width="1068" height="726" alt="A screenshot of ECARX's news page on a desktop monitor." loading="lazy" decoding="async">
</picture>

I had the opportunity to work on the frontend development for ECARX's new website with a team of developers from [Hugo & Cat](https://www.hugoandcat.com/). The website, based on Umbraco, incorporated a Storybook component library for the site build.

Using [GSAP](https://gsap.com/), I implemented various animations, contributing to a dynamic and visually appealing user interface.

<ol role="list" class="auto-grid | no-list">
  <li>
    {{ imageNormal(
      "/assets/images/projects/hugo-and-cat/ecarx/ecarx-services-mobile_01.webp",
      "A screenshot of ECARX's services page on a mobile screen",
      "293",
      "600",
      false,
      false,
      "lazy")
    }}
  </li>
  <li>
    {{ imageNormal(
      "/assets/images/projects/hugo-and-cat/ecarx/ecarx-services-tablet_01.webp",
      "A screenshot of ECARX's services page on a tablet screen",
      "418",
      "600",
      false,
      false,
      "lazy")
    }}
  </li>
</ol>
