---
title: Varo / Brunswick Group
# Populates the `meta description` for a page as well as the project landing page project-specific summary
summary: Developed & enhanced a CMS driven corporate communication website for Varo, a client of Brunswick Group.
# Populates the opening / `lead` text on a page
lead:
  - Developed & enhanced a <abbr title="Content Management System.">CMS</abbr> driven <abbr title="Multi Page Application.">MPA</abbr> corporate communication website for Varo, a client of Brunswick Group.

project:
  year: 2023
  role: Frontend Web Developer
  technologies: HTML5, CSS, SCSS, JavaScript (ES6), jQuery, Bootstrap 5, Bitbucket, Umbraco, Photoshop, Figma, JIRA, Confluence.
  websiteLabel: www.varoenergy.com
  websiteUrl: https://www.varoenergy.com/
  order: 3

# Image component rules / properties for projects list page
# #######################################################
image:
  # The projects landing list page uses the `srcWebp` and `srcJpg` values
  srcWebp: "/assets/images/projects/brunswick-group/varo/varo_01--thumbnail.webp"
  srcJpg: "/assets/images/projects/brunswick-group/varo/varo_01--thumbnail.jpg"
  alt: "A screenshot of Varo's homepage"
  width: 650
  height: 464
  # Should the image thumbnail on the list page lazy load?
  lazyLoad: true

date: 2024-02-17T23:09:27.631Z

eleventyExcludeFromCollections: false
---

{% from "components/core/images/images.njk" import imageNormal %}

<picture>
  <source srcset="/assets/images/projects/brunswick-group/varo/varo-homepage--lg-screen_01.webp" type="image/webp" media="(min-width: 768px)">
  <img src="/assets/images/projects/brunswick-group/varo/varo-homepage--sml-screen_01.webp" width="1068" height="726" alt="A screenshot of Varo's homepage on a desktop monitor." loading="lazy" decoding="async">
</picture>

Collaborated with a team of designers and developers at Brunswick Group to implement improvements on Varo's corporate communication website, with a focus on enhancing the user experience and maintaining alignment with the client’s communication objectives.

<ol role="list" class="auto-grid | no-list">
  <li>
    {{ imageNormal(
      "/assets/images/projects/brunswick-group/varo/varo-homepage-mobile_01.webp",
      "A screenshot of Varo's homepage on a mobile screen",
      "293",
      "600",
      false,
      false,
      "lazy")
    }}
  </li>
  <li>
    {{ imageNormal(
      "/assets/images/projects/brunswick-group/varo/varo-homepage-tablet_01.webp",
      "A screenshot of Varo's homepage on a tablet screen",
      "418",
      "600",
      false,
      false,
      "lazy")
    }}
  </li>
</ol>

*[CMS]: Content Management System.
*[MPA]: Multi Page Application.
