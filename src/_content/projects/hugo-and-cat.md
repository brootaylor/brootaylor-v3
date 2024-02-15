---
title: Hugo & Cat
# Populates the `meta description` for a page as well as the project landing page project-specific summary
summary: Collaborated with Hugo & Cat on a successful web project for ECARX, a leading automotive technology company.
# Populates the opening / `lead` text on a page
lead:
  - Collaborated with Hugo & Cat on a successful web project for ECARX, a leading automotive technology company.

project:
  year: 2023
  role: Senior Frontend Web Developer
  technologies: HTML5, CSS, SCSS, JavaScript, GSAP, Handlebars, Storybook, Webpack, Gulp, Cypress, Umbraco, .NET Razor Views, Azure DevOps, Figma
  order: 1

date: 2024-02-14T18:37:27.631Z

eleventyExcludeFromCollections: false
---

{% from "components/core/images/images.njk" import imageNormal %}
{% from "components/core/images/images.njk" import imageFigure %}

{{ imageFigure(
  "/assets/images/projects/hugo-and-cat/ecarx-services-page02.jpg",
  "A screenshot of ECARX's software services website page",
  "1200",
  "972",
  "ECARX's software services page",
  false,
  false,
  "lazy")
}}

ECARX is an Umbraco based website, incorporating a Storybook component library for the site build, and featuring a substantial amount of animation and interactivity.

I was brought on to implement some of the larger animation pieces. Using GSAP I used the `scrollTrigger` method to initialise various animations on the timeline. This can be experienced when visiting the homepage and seeing how the hero banner reveals the video as the user begins to scroll.

<ol class="auto-grid | no-list">
  <li>
    {{ imageNormal(
      "/assets/images/projects/hugo-and-cat/ecarx-services-page02.jpg",
      "A screenshot of ECARX's software services website page",
      "1200",
      "972",
      false,
      "shadow",
      "lazy")
    }}
  </li>
  <li>
    {{ imageNormal(
      "/assets/images/projects/hugo-and-cat/ecarx-services-page02.jpg",
      "A screenshot of ECARX's software services website page",
      "1200",
      "972",
      false,
      "shadow",
      "lazy")
    }}
  </li>
  <li>
    {{ imageNormal(
      "/assets/images/projects/hugo-and-cat/ecarx-services-page02.jpg",
      "A screenshot of ECARX's software services website page",
      "1200",
      "972",
      false,
      "shadow",
      "lazy")
    }}
  </li>
</ol>

The website can be viewed at [www.ecarxgroup.com](https://www.ecarxgroup.com)
