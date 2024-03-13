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
      max-width: 23ch;
    }

    h1 strong {
      font-weight: 900;
    }

    .lead p {
      font-size: 1.5rem;
      font-size: clamp(1.5rem, 2.5vw, 1.875rem);
      text-wrap: balance;
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

date: 2024-03-13T13:40:27.631Z

priority: 1
---

<div class="call-out | flow">
  <p>Whether you're <em><strong>starting fresh</strong></em> or <em><strong>improving an existing one</strong></em>, I'm here to assist you in establishing a lasting and meaningful online presence.</p>
  <p>I'd <a href="/contact">love to hear from you</a> if you think I may be able to help out with your next project &mdash; or if you'd just like to connect. 👋</p>
</div>

<h2 id="testimonial" tabindex="-1" class="visually-hidden">Testimonial <a class="header-anchor" href="#testimonial">#</a></h2>
{% set testimonials = [
  '<blockquote>
    <p>Bruce is a true digital native. Starting in the industry back as far as Boo.com and continually striving to push the boundaries of front end code design. He takes it upon himself to continually keep up to date with the latest trends and to apply that to his work to the benefit of whoever he is working for.</p>
    <p>I have no hesitation in recommending Bruce for any role in which pushing your digital boundaries is at the core of your agenda.</p>
    <footer>— Stephen Scott, Chief Digital Officer, <cite><a href="https://www.iagloyalty.com" rel="external">IAG Loyalty</a></cite></footer>
  </blockquote>',
  '<blockquote>
    <p>I worked with Bruce for many years at Avios, both within the same team and across projects. Bruce was incredibly knowledgeable in website design and development, always came up with great solutions, delivered to a high standard with great attention to detail, and was very easy to work with.</p>
    <p>He was also able to communicate his technical knowledge in a straightforward way to someone who was not from a technical background. I would highly recommend Bruce to any organisation.</p>
    <footer>— Nicola Chrome, Senior Media and Content Marketing Manager, <a href="https://www.avios.com/en-GB" rel="external">Avios</a>. <em>(Currently, "Founder" of Relocate Down Under)</em></footer>
  </blockquote>',
  '<blockquote>
    <p>We got Bruce in to to help us develop a front-end boilerplate / component library as we were inundated with projects and needed a safe pair of hands that could help us achieve quality results with minimal supervision.</p>
    <p>Bruce delivered a high-quality framework that ticks all of the boxes for us. And to top it all he’s a great guy to work with, highly professional, he gets on well with everyone and really cares about his work. I would not hesitate to hire Bruce again.</p>
    <footer>— Paul Davison, Head Of Design, <cite><a href="https://charanga.com" rel="external">Charanga Music</a></cite></footer>
  </blockquote>',
  '<blockquote>
    <p>Bruce is great addition to any team, a great personality who requires minimal management and produces accurate and attractive output. He keeps up to date with the latest techniques and is happy to share those skills with others.</p>
    <p>I wouldn’t hesitate in giving Bruce another opportunity when one arises.</p>
    <footer>— Roger Mathews, Head of System Development and Administration, <a href="https://www.macmillan.org.uk/" rel="external">Macmillan Cancer Support</a>. <em>(Currently, "Chief Technology Officer" at The Institute of Cancer Research)</em></footer>
  </blockquote>'
] %}

{{ testimonials | random | safe }}
