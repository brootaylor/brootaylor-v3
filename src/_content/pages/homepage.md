---
layout: "layouts/homepage.njk"
title: Hi, I'm Bruce.
# Populates the `meta description` for a page
summary: "Bruce lives in Crawley, West Sussex, England with his family. He's a Frontend Web Developer and helps businesses build user-friendly, responsive, accessible, and resilient websites that stand the test of time."

# Populates the opening / `lead` text on a page
lead:
  - I help businesses build user-friendly, responsive, accessible, and resilient websites that stand the test of time.
  - Over the past two decades, I've had the opportunity to contribute to <a href="/projects">various projects</a> in industries like e-commerce, travel and tourism, hospitality, healthcare and medical, digital marketing, education, and charities.

# Page-specific metadata content added to the `<head>`
head: "
  <style>
    .profile {
        max-width: 300px;
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

date: 2024-02-12T13:48:00

priority: 1
---

I'd [love to hear from you](/contact) if you think I may be able to help out with your next project &mdash; or if you'd just like to connect. 👋 {.call-out}

Even though I've done this web building thing for a while now, I certainly haven't got it all figured out. I'm still learning and I imagine you are as well.

---

{% from "components/core/blockquotes/blockquotes.njk" import blockquote %}
{%- call blockquote('Paul Davison, Head Of Design', 'https://charanga.com', 'Charanga Music') -%}
  We got Bruce in to to help us develop a front-end boilerplate / component library as we were inundated with projects and needed a safe pair of hands that could help us achieve quality results with minimal supervision.<br><br>
  Bruce delivered a high-quality framework that ticks all of the boxes for us. And to top it all he’s a great guy to work with, highly professional, he gets on well with everyone and really cares about his work. I would not hesitate to hire Bruce again.
{%- endcall %}
