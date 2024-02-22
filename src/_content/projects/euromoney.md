---
title: Euromoney
# Populates the `meta description` for a page as well as the project landing page project-specific summary
summary: Developed a versatile frontend starter kit in collaboration with Euromoney's team of designers, backend developers, and testers.
# Populates the opening / `lead` text on a page
lead:
  - Developed a versatile frontend starter kit in collaboration with Euromoney's team of designers, backend developers, and testers.

# Social image details - (Is used by content sharing channels like Facebook, Twitter, WhatsApp, LinkedIn, RSS readers etc.)
# ##########################################################################################################################
socialImage:
  url: "/assets/images/projects/euromoney/fastmarkets_01--thumbnail.jpg"
  alt: "A screenshot of Fastmarkets' homepage"

project:
  year: 2018
  role: Frontend Web Developer
  technologies: HTML5, CSS, SCSS, JavaScript, jQuery, Handlebars, Grunt, Photoshop, Zeplin, Fractal, Bitbucket, .NET Razor Views, Sitecore, JIRA, Confluence
  order: 7

# Image component rules / properties for projects list page
# #######################################################
image:
  # The projects landing list page uses the `srcWebp` and `srcJpg` values
  srcWebp: "/assets/images/projects/euromoney/fastmarkets_01--thumbnail.webp"
  srcJpg: "/assets/images/projects/euromoney/fastmarkets_01--thumbnail.jpg"
  alt: "A screenshot of Fastmarkets' homepage"
  width: 650
  height: 464
  # Should the image thumbnail on the list page lazy load?
  lazyLoad: true

date: 2024-02-17T23:09:27.631Z

eleventyExcludeFromCollections: false
---

{% from "components/core/images/images.njk" import imageNormal %}

{{ imageNormal(
  "/assets/images/projects/euromoney/fastmarkets--sml-screen_01.webp",
  "A screenshot of Fastmarkets' homepage on a desktop monitor",
  "1200",
  "951",
  false,
  false,
  "lazy")
}}

In close collaboration with one of Euromoney's teams of designers, backend developers, and testers, I played a key role in creating a versatile frontend starter kit. This kit, designed for the rapid creation of modular web components and pattern libraries using Fractal, was integrated into Euromoney's existing .NET MVC backend application.

Working closely with the backend developers, I implemented and fine-tuned the frontend changes within the application. The collaborative efforts within the team resulted in an efficient and customizable solution, allowing Euromoney to streamline the development and deployment of their B2B websites &mdash; in this instance, Fastmarkets.

It was a thoroughly enjoyable and collaborative effort, and I'm grateful for the opportunity to work alongside such a skilled and dedicated team at Euromoney.

*[MVC]: Model–View–Controller.
