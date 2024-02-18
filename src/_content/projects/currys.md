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

date: 2024-02-17T23:09:27.631Z

eleventyExcludeFromCollections: false
---

{% from "components/core/images/images.njk" import imageNormal %}

{{ imageNormal(
  "/assets/images/projects/currys/carphone-warehouse--sml-screen_01.webp",
  "A screenshot of Carphone Warehouse's website on a desktop monitor",
  "1200",
  "951",
  false,
  false,
  "lazy")
}}

In addition, I worked with one of Currys' web teams to help improve and optimise parts of the user interface and usability of the [Mobiles.co.uk](https://www.mobiles.co.uk/){rel=external} and [e2save](https://www.e2save.com/){rel=external} websites.

<ol role="list" class="auto-grid | no-list">
  <li>
    {{ imageNormal(
      "/assets/images/projects/currys/e2save-mobile_01.webp",
      "A screenshot of e2save on a mobile screen",
      "293",
      "600",
      false,
      false,
      "lazy")
    }}
  </li>
  <li>
    {{ imageNormal(
      "/assets/images/projects/currys/mobilesuk-tablet_01.webp",
      "A screenshot of Mobiles.co.uk on a tablet screen",
      "418",
      "600",
      false,
      false,
      "lazy")
    }}
  </li>
</ol>
