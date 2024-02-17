---
title: UX Brighton
# Populates the `meta description` for a page as well as the project landing page project-specific summary
summary: Enhanced and optimised their user interface, overall website experience, developer experience, content management workflow, search and SEO.
# Populates the opening / `lead` text on a page
lead:
  - Enhanced and optimised their user interface, overall website experience, developer experience, content management workflow, search and <abbr title="Search Engine Optimisation.">SEO</abbr>.

project:
  year: 2022 &mdash; Present
  role: Frontend Web Development
  technologies: HTML5, CSS, SCSS, JavaScript, GSAP, Handlebars, Storybook, Webpack, Gulp, Cypress, Umbraco, .NET Razor Views, Azure DevOps, Figma
  order: 2

# Image component rules / properties for projects list page
# #######################################################
image:
  # The projects landing list page uses the `srcWebp` and `srcJpg` values
  srcWebp: "/assets/images/projects/ux-brighton/uxbrighton_01--thumbnail.webp"
  srcJpg: "/assets/images/projects/ux-brighton/uxbrighton_01--thumbnail.jpg"
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
  "/assets/images/projects/ux-brighton/uxbrighton-homepage_01.webp",
  "A screenshot of UX Brighton's website homepage",
  "1620",
  "734",
  "UX Brighton's homepage",
  false,
  false,
  "lazy")
}}

UX Brighton is a static website. It's built using the Jekyll SSG and deployed using Netlify. It uses a Netlify CMS configuration to management the content.

The website can be viewed at [uxbri.org](https://uxbri.org/){rel=external}

*[SSG]: Static Site Generator.
*[CMS]: Content Management System.
*[SEO]: Search Engine Optimisation.
