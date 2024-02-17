---
title: Varo / Brunswick Group
# Populates the `meta description` for a page as well as the project landing page project-specific summary
summary: Developed & enhanced a CMS driven corporate communication website for Varo. One of Brunswick Group's clients.
# Populates the opening / `lead` text on a page
lead:
  - Developed & enhanced a <abbr title="Content Management System.">CMS</abbr> driven <abbr title="Multi Page Application.">MPA</abbr> corporate communication website for Varo. One of Brunswick Group's clients.

project:
  year: 2023
  role: Frontend Web Developer
  technologies: HTML5, CSS, SCSS, JavaScript, jQuery, Bootstrap 5, Bitbucket, Umbraco, Photoshop, Figma, JIRA, Confluence.
  order: 3

# Image component rules / properties for projects list page
# #######################################################
image:
  # The projects landing list page uses the `srcWebp` and `srcJpg` values
  srcWebp: "/assets/images/projects/brunswick-group/varo/varo_01--thumbnail.webp"
  srcJpg: "/assets/images/projects/brunswick-group/varo/varo_01--thumbnail.jpg"
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
  "/assets/images/projects/brunswick-group/varo/varo-homepage_01.jpg",
  "A screenshot of the ECARX software services website page",
  "1200",
  "970",
  "Varo's homepage",
  false,
  "shadow",
  "lazy")
}}

The website can be viewed at [www.varoenergy.com](https://www.varoenergy.com/)

*[CMS]: Content Management System.
*[MPA]: Multi Page Application.
