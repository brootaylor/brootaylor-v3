---
title: Analog Implant Laboratory
# Populates the `meta description` for a page as well as the project landing page project-specific summary
summary: Collaborated with Hugo & Cat on a successful web project for ECARX, a leading automotive technology company.
# Populates the opening / `lead` text on a page
lead:
  - Collaborated with Hugo & Cat on a successful web project for ECARX, a leading automotive technology company.

project:
  year: 2023
  role: Senior Frontend Web Developer
  technologies: HTML5, CSS, SCSS, JavaScript, GSAP, Handlebars, Storybook, Webpack, Gulp, Cypress, Umbraco, .NET Razor Views, Azure DevOps, Figma
  order: 8

# Image component rules / properties for projects list page
# #######################################################
image:
  # The projects landing list page uses the `srcWebp` and `srcJpg` values
  srcWebp: "/assets/images/projects/analog-implant-laboratory/analog-implant-laboratory_01--thumbnail.webp"
  srcJpg: "/assets/images/projects/analog-implant-laboratory/analog-implant-laboratory_01--thumbnail.jpg"
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
  "/assets/images/projects/analog-implant-laboratory/analog-implant-laboratory_01.jpg",
  "A screenshot of the ECARX software services website page",
  "1200",
  "972",
  "ECARX software services website page",
  false,
  "shadow",
  "lazy")
}}

This particular project turned out to be one of the enjoyable ones. A lot of this had to do with Analog Implant Laboratory's open-handed and open-hearted involvement in the whole design and development process. I appreciated it immensely. I'm conscious that not every project has or necessarily ends up being a pleasant one, so I'm grateful for the ones that are.

I approached the design and development with 'Mobile First' in mind and built it responsively &ndash; *(small screen upwards)* &ndash; to work on as many screens and devices as possible. It's [progressively enhanced](https://www.gov.uk/service-manual/technology/using-progressive-enhancement){rel=external} and makes substantial use of WCAG.

It goes without saying, I wasn't able to test the website on all device types and screen sizes but I tried my best to ensure it's built in a <a href="http://trentwalton.com/2014/03/10/device-agnostic/" rel="external">device-agnostic</a> manner.

The website can be viewed at [analog-lab.co.uk](http://analog-lab.co.uk/){rel=external}

*[WCAG]: Web Content Accessibility Guidelines.
