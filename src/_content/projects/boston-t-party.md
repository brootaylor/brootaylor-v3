---
title: Boston T Party
# Populates the `meta description` for a page as well as the project landing page project-specific summary
summary: A fast and friendly customer informational website for Boston T Party's hospitality in South Africa.
# Populates the opening / `lead` text on a page
lead:
  - A fast and friendly customer informational <abbr title="Progressive Web App.">PWA</abbr> website for Boston T Party's hospitality business in South Africa.

# Social image details - (Is used by content sharing channels like Facebook, Twitter, WhatsApp, LinkedIn, RSS readers etc.)
# ##########################################################################################################################
socialImage:
  url: "/assets/images/projects/boston-t-party/bostontparty_01--thumbnail.jpg"
  alt: "A screenshot of Boston T Party's homepage"

project:
  year: 2022 &mdash; Ongoing
  role: Frontend Web Design & Development
  technologies: HTML5, CSS, SCSS, JavaScript, Service Worker, PWA manifest, Eleventy, Nunjucks, Jest, Rollup.js, Node.js, GitHub, Netlify, Photoshop.
  websiteLabel: bostontparty.co.za
  websiteUrl: https://bostontparty.co.za/
  order: 6

# Image component rules / properties for projects list page
# #######################################################
image:
  # The projects landing list page uses the `srcWebp` and `srcJpg` values
  srcWebp: "/assets/images/projects/boston-t-party/bostontparty_01--thumbnail.webp"
  srcJpg: "/assets/images/projects/boston-t-party/bostontparty_01--thumbnail.jpg"
  alt: "A screenshot of Boston T Party's homepage"
  width: 650
  height: 464
  # Should the image thumbnail on the list page lazy load?
  lazyLoad: true

date: 2024-03-01T12:15:27.631Z

eleventyExcludeFromCollections: false
---

<picture>
  <source srcset="/assets/images/projects/boston-t-party/bostontparty-homepage--lg-screen_01.webp" type="image/webp" media="(min-width: 768px)">
  <img src="/assets/images/projects/boston-t-party/bostontparty-homepage--sml-screen_01.webp" width="1068" height="726" alt="A screenshot of Boston T Party's homepage on a desktop monitor." loading="lazy" decoding="async">
</picture>

Developed a high speed PWA website tailored for Boston T Party, emphasising performance and resilience through progressive enhancement and offline caching techniques.

Ease of use, access, performance, and resilience were particularly crucial considering the limited connectivity, data and bandwidth availability in South Africa.

---
{% from "components/core/blockquotes/blockquotes.njk" import blockquote %}
{%- call blockquote('Sue Brighton, Owner, <a href="https://bostontparty.co.za/">Boston T Party</a> <em>(South Africa)</em>') -%}
  We started our small hospitality business in 2009, with little or no direction on how to create and manage a website. Bruce came to the rescue by providing a user-friendly and informative site – numerous guests have commented as to the ease in which they were able to navigate the Boston T Party website.

  Bruce has provided constant updates, always suggesting new and innovative ways to improve the design or content of the site in line with the ever changing needs of our guests/travellers and technology.

  Any issues are dealt with timeously, with great attention to detail. We are extremely happy to continue to work with Bruce and engage with his professional and friendly service.
{%- endcall %}

*[PWA]: Progressive Web App.
