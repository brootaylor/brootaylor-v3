---
layout: "layouts/homepage.njk"
title: Hi, I'm Bruce.
# Populates the `meta description` for a page
summary: "Bruce lives in Crawley, West Sussex, England with his family. He's a Frontend Web Developer and helps businesses build user-friendly, responsive, accessible, and resilient websites that are built on strong foundations for lasting impact."

# Populates the opening / `lead` text on a page
lead:
  - I help businesses build user-friendly, responsive, accessible, and resilient websites that are built on strong foundations for lasting impact.
  - Over the past two decades, I've had the opportunity to contribute to <a href="/projects">various projects</a> in industries like e-commerce, travel and tourism, hospitality, healthcare and medical, digital marketing, education, and charities.

# Page-specific metadata content added to the `<head>`
head: "
  <style>
    .profile {
        max-width: 300px;
    }

    .lead a {
      text-wrap: nowrap;
    }

    @media screen and (min-width: 48rem) {
      .profile {
        max-width: 250px;
      }
    }
  </style>
"

# Page-specific JS added just before the closing `</body>`
# foot: "
#   <script>
#     (function () {
#       console.log('This is the homepage');
#     })()
#   </script>
# "

bodyClass: "homepage"

permalink: "/index.html"

date: 2024-02-15T16:11:00

priority: 1
---

I'd [love to hear from you](/contact) if you think I may be able to help out with your next project &mdash; or if you'd just like to connect. 👋 {.call-out}

---

<h2 id="testimonial" tabindex="-1" class="visually-hidden">Testimonial <a class="header-anchor" href="#testimonial">#</a></h2>

{% from "components/core/blockquotes/blockquotes.njk" import blockquote %}
{%- call blockquote('Stephen Scott, Chief Digital Officer', 'https://www.iagloyalty.com', 'IAG Loyalty') -%}
  Bruce is a true digital native. Starting in the industry back as far as Boo.com and continually striving to push the boundaries of front end code design. He takes it upon himself to continually keep up to date with the latest trends and to apply that to his work to the benefit of whoever he is working for. I have no hesitation in recommending Bruce for any role in which pushing your digital boundaries is at the core of your agenda.
{%- endcall %}
