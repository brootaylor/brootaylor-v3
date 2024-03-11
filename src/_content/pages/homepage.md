---
layout: "layouts/homepage.njk"
title: <strong>Hi, <a href="/about">I'm Bruce</a></strong>. I'm a frontend web developer and ui engineer.
# Populates the `meta description` for a page
summary: "Bruce is a Web Developer based in Crawley, West Sussex. Specialising in crafting performant, user-friendly, responsive, and resilient websites for individuals, businesses, and non-profit organisations. Build from scratch or update your site for a lasting online presence."

# Populates the opening / `lead` text on a page
lead:
  - I specialise in helping individuals and businesses craft <strong>performant</strong>, <strong>user-friendly</strong>, <strong>responsive</strong>, <strong>accessible</strong>, and <strong>resilient websites</strong>.

# Page-specific metadata content added to the `<head>`
head: "
  <style>
    h1 {
      font-weight: 400;
    }

    h1 strong {
      font-weight: 900;
    }

    .lead p:first-child {
      font-size: 1.5rem;
      font-size: clamp(1.5rem, 2.5vw, 1.875rem);
    }

    .call-out {
      max-width: 80ch;
    }

    .homepage blockquote {
      margin-top: 2em;
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

date: 2024-03-09T00:12:27.631Z

priority: 1
---

<div class="call-out | flow">
  <p>Whether you're <em><strong>starting fresh</strong></em> or <em><strong>improving an existing one</strong></em>, I'm here to assist you in establishing a lasting and meaningful online presence.</p>
  <p>I'd <a href="/contact">love to hear from you</a> if you think I may be able to help out with your next project &mdash; or if you'd just like to connect. 👋</p>
</div>

<h2 id="testimonial" tabindex="-1" class="visually-hidden">Testimonial <a class="header-anchor" href="#testimonial">#</a></h2>

{% from "components/core/blockquotes/blockquotes.njk" import blockquote %}
{%- call blockquote('Stephen Scott, Chief Digital Officer', 'https://www.iagloyalty.com', 'IAG Loyalty') -%}
  Bruce is a true digital native. Starting in the industry back as far as Boo.com and continually striving to push the boundaries of front end code design. He takes it upon himself to continually keep up to date with the latest trends and to apply that to his work to the benefit of whoever he is working for.

  I have no hesitation in recommending Bruce for any role in which pushing your digital boundaries is at the core of your agenda.
{%- endcall %}
