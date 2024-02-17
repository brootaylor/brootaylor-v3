---
title: Currys
# Populates the `meta description` for a page as well as the project landing page project-specific summary
summary: Migration of the Carphone Warehouse website content to a more advanced in-house content management platform.
# Populates the opening / `lead` text on a page
lead:
  - Migration of the Carphone Warehouse website content to a more advanced in-house content management platform.

project:
  year: 2022
  role: Frontend Web Developer
  technologies: HTML5, CSS, SCSS, JavaScript, jQuery, PHP, Twig, Docker, GitLab, Photoshop, JIRA, Confluence.
  order: 4

# Image component rules / properties for projects list page
# #######################################################
image:
  # The projects landing list page uses the `srcWebp` and `srcJpg` values
  srcWebp: "/assets/images/projects/currys/carphone-warehouse_01--thumbnail.webp"
  srcJpg: "/assets/images/projects/currys/carphone-warehouse_01--thumbnail.jpg"
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
  "/assets/images/projects/currys/carphone-warehouse_01.jpg",
  "A screenshot of the ECARX software services website page",
  "1200",
  "972",
  "Carphone Warehouse website",
  false,
  "shadow",
  "lazy")
}}

Worked with one of Currys' web teams to improve and optimise the user interface and usability of the [Mobiles.co.uk](https://www.mobiles.co.uk/) and [e2save](https://www.e2save.com/) websites.
