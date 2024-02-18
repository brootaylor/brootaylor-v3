---
title: UX Brighton
# Populates the `meta description` for a page as well as the project landing page project-specific summary
summary: Working with UX Brighton to enhance and optimise their user interface, overall website experience, developer experience, content management workflow, search and SEO.
# Populates the opening / `lead` text on a page
lead:
  - Working with UX Brighton to enhance and optimise their user interface, overall website experience, developer experience, content management workflow, search and <abbr title="Search Engine Optimisation.">SEO</abbr>.

project:
  year: 2022 &mdash; Present
  role: Frontend Web Development
  technologies: HTML5, CSS, SCSS, JavaScript (ES6), jQuery, Jekyll, Liquid, JSON, GitHub, GitHub Pages, Node.js, Retool, Swagger, Netlify, Netlify CMS, Google Analytics, Figma, Photoshop.
  order: 2

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

date: 2024-02-17T23:09:27.631Z

eleventyExcludeFromCollections: false
---

{% from "components/core/images/images.njk" import imageNormal %}

<picture>
  <source srcset="/assets/images/projects/ux-brighton/uxbrighton-homepage--lg-screen_01.webp" type="image/webp" media="(min-width: 768px)">
  <img src="/assets/images/projects/ux-brighton/uxbrighton-homepage--sml-screen_01.webp" width="1068" height="726" alt="A screenshot of UX Brighton's homepage on a desktop monitor." loading="lazy" decoding="async">
</picture>

UX Brighton is a static website. It's built using the Jekyll SSG and deployed using Netlify. It uses a Netlify CMS configuration to management the content.

We rebuilt the [UX Brighton job board](https://uxbri.org/jobs){rel=external} so it renders as a MPA rather than a SPA. This allows for far richer indexing by search engines. Every job post and event page also dynamically includes valid structured schema data at build time, generates a new `sitemap.xml` file, and automatically notifies Google of these changes.

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

The website can be viewed at [uxbri.org](https://uxbri.org/){rel=external}

*[SSG]: Static Site Generator.
*[CMS]: Content Management System.
*[SEO]: Search Engine Optimisation.
*[SPA]: Single Page Application.
*[MPA]: Multi Page Application.
