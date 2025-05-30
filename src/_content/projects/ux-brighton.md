---
title: UX Brighton
# Populates the `meta description` for a page as well as the project landing page project-specific summary
summary: Worked with UX Brighton to improve and optimise their user interface, overall website experience, developer experience, content management workflow, site search & filtering, and SEO.
# Populates the opening / `lead` text on a page
lead:
  - Worked with UX Brighton to improve and optimise their user interface, overall website experience, developer experience, content management workflow, site search & filtering, and <abbr title="Search Engine Optimisation.">SEO</abbr>.

# Social image details - (Is used by content sharing channels like Facebook, Twitter, WhatsApp, LinkedIn, RSS readers etc.)
# ##########################################################################################################################
socialImage:
  url: "/assets/images/projects/ux-brighton/uxbrighton_01--thumbnail.jpg"
  alt: "A screenshot of UX Brighton's homepage"

project:
  year: 2022 &mdash; 2024
  role: Frontend Web Development
  technologies: HTML5, CSS, SCSS, JavaScript <em>(ES5 & ES6+)</em>, jQuery, Jekyll, Liquid, JSON, GitHub, GitHub Pages, Node.js, Retool, Swagger, Netlify, Netlify CMS, Google Analytics, Google Tag Manager <em>(GTM)</em>, Figma, Photoshop.
  websiteLabel: uxbri.org
  websiteUrl: https://uxbri.org/
  order: 3

# Image component rules / properties for projects list page
# #######################################################
image:
  # The projects landing list page uses the `srcWebp` and `srcJpg` values
  srcWebp: "/assets/images/projects/ux-brighton/uxbrighton_01--thumbnail.webp"
  srcJpg: "/assets/images/projects/ux-brighton/uxbrighton_01--thumbnail.jpg"
  alt: "A screenshot of UX Brighton's homepage"
  width: 650
  height: 464
  # Should the image thumbnail on the list page lazy load?
  lazyLoad: true

date: 2025-05-12T19:51:27.631Z

eleventyExcludeFromCollections: false
---

{% from "components/core/images/images.njk" import imageNormal %}

<picture>
  <source srcset="/assets/images/projects/ux-brighton/uxbrighton-homepage--lg-screen_01.webp" type="image/webp" media="(min-width: 768px)">
  <img src="/assets/images/projects/ux-brighton/uxbrighton-homepage--sml-screen_01.webp" width="1068" height="726" alt="A screenshot of UX Brighton's homepage on a desktop monitor." loading="lazy" decoding="async">
</picture>

UX Brighton is a static website. It's built using the Jekyll SSG and deployed using Netlify. It uses a Netlify CMS configuration to manage the content.

We rebuilt the [UX Brighton job board](https://uxbri.org/jobs) so it renders as a MPA rather than a SPA. This allows for far richer indexing by search engines. Every job post and event page also dynamically includes valid structured schema data at build time, generates a new `sitemap.xml` file, and automatically notifies Google of these changes.

<ol role="list" class="auto-grid | no-list">
  <li>
    {{ imageNormal(
      "/assets/images/projects/ux-brighton/uxbrighton-jobs-mobile_01.webp",
      "A screenshot of UX Brighton's job board page on a mobile screen",
      "293",
      "600",
      false,
      false,
      "lazy")
    }}
  </li>
  <li>
    {{ imageNormal(
      "/assets/images/projects/ux-brighton/uxbrighton-jobs-tablet_01.webp",
      "A screenshot of UX Brighton's job board page on a tablet screen",
      "418",
      "600",
      false,
      false,
      "lazy")
    }}
  </li>
</ol>

*[SSG]: Static Site Generator.
*[CMS]: Content Management System.
*[SEO]: Search Engine Optimisation.
*[SPA]: Single Page Application.
*[MPA]: Multi Page Application.
