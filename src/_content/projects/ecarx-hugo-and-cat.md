---
title: ECARX / Hugo & Cat
# Populates the `meta description` for a page as well as the project landing page project-specific summary
summary: Collaborated with Hugo & Cat on a web project for ECARX, a leading automotive technology company.
# Populates the opening / `lead` text on a page
lead:
  - Collaborated with Hugo & Cat on a web project for ECARX, a leading automotive technology company.

project:
  year: 2023
  role: Senior Frontend Web Developer
  technologies: HTML5, CSS, SCSS, JavaScript (ES6), GSAP, Handlebars, Storybook, Webpack, Gulp, Cypress, Umbraco, .NET Razor Views, Azure DevOps, Figma
  order: 1

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

date: 2024-02-17T23:09:27.631Z

eleventyExcludeFromCollections: false
---

{% from "components/core/images/images.njk" import imageNormal %}

<picture>
  <source srcset="/assets/images/projects/hugo-and-cat/ecarx/ecarx-news--lg-screen_01.webp" type="image/webp" media="(min-width: 640px)">
  <img src="/assets/images/projects/hugo-and-cat/ecarx/ecarx-news--sml-screen_01.webp" width="1200" height="951" alt="A screenshot of ECARX's news page on a desktop monitor." loading="lazy" decoding="async">
</picture>

I had the opportunity to work on the frontend development for ECARX's new website with a team of developers from [Hugo & Cat](https://www.hugoandcat.com/){rel=external}. The website, based on Umbraco, incorporated a Storybook component library for the site build.

Using [GSAP](https://gsap.com/){rel=external}, I implemented various animations, contributing to a dynamic and visually appealing user interface.

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

The website can be viewed at [www.ecarxgroup.com](https://www.ecarxgroup.com){rel=external}
