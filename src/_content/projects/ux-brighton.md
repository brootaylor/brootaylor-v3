---
title: UX Brighton
# Populates the `meta description` for a page as well as the project landing page project-specific summary
summary: Enhanced and optimised their user interface, overall website experience, developer experience, content management workflow, search and SEO.
# Populates the opening / `lead` text on a page
lead:
  - Enhanced and optimised their user interface, overall website experience, developer experience, content management workflow, search and SEO.

project:
  year: Ongoing
  role: Frontend Web Development
  technologies: HTML5, CSS, SCSS, JavaScript, GSAP, Handlebars, Storybook, Webpack, Gulp, Cypress, Umbraco, .NET Razor Views, Azure DevOps, Figma
  order: 2

date: 2024-02-14T18:37:27.631Z

eleventyExcludeFromCollections: false
---

{% from "components/core/images/images.njk" import imageNormal %}
{% from "components/core/images/images.njk" import imageFigure %}

{{ imageFigure(
  "/assets/images/projects/ux-brighton/uxbrighton-homepage01.jpg",
  "A screenshot of UX Brighton's website homepage",
  "1200",
  "972",
  "UX Brighton's homepage",
  false,
  false,
  "lazy")
}}

ECARX is an Umbraco based website, incorporating a Storybook component library for the site build, and featuring a substantial amount of animation and interactivity.

I was brought on to implement some of the larger animation pieces. Using GSAP I used the `scrollTrigger` method to initialise various animations on the timeline. This can be experienced when visiting the homepage and seeing how the hero banner reveals the video as the user begins to scroll.

<ol class="auto-grid | no-list">
  <li>
    {{ imageNormal(
      "/assets/images/projects/ux-brighton/uxbrighton-homepage01.jpg",
      "A screenshot of UX Brighton's website homepage",
      "1200",
      "972",
      false,
      "shadow",
      "lazy")
    }}
  </li>
  <li>
    {{ imageNormal(
      "/assets/images/projects/ux-brighton/uxbrighton-homepage01.jpg",
      "A screenshot of UX Brighton's website homepage",
      "1200",
      "972",
      false,
      "shadow",
      "lazy")
    }}
  </li>
  <li>
    {{ imageNormal(
      "/assets/images/projects/ux-brighton/uxbrighton-homepage01.jpg",
      "A screenshot of UX Brighton's website homepage",
      "1200",
      "972",
      false,
      "shadow",
      "lazy")
    }}
  </li>
</ol>

The website can be viewed at [www.ecarxgroup.com](https://www.ecarxgroup.com)
