---
title: "Projects"
# Populates the `meta description` for a page
summary: "I specialise in helping people craft performant, user-friendly, responsive, accessible, and resilient websites. Whether you're starting fresh or improving an existing one, I'm here to assist you in establishing a lasting and meaningful online presence."
# Populates the opening / `lead` text on a page
lead:
  - Over the years, I've had the privilege of working with some fantastic people. Here are a few of the projects I've helped out with.
  - Think I could help with your next project? Please <a href="/contact">get in touch</a>.

# Social image details - (Is used by channels like Facebook, Twitter, WhatsApp, LinkedIn etc.)
# ############################################################################################
socialImage:
  url: "/assets/images/projects/projects-landing-thumbnail.jpg"
  alt: "A collage of my latest projects"

bodyClass: "projects-home"

permalink: "{% if pagination.pageNumber > 0 %}/projects/{{ pagination.pageNumber + 1 }}/index.html{% else %}/projects.html{% endif %}"

pagination:
  data: collections.pageProjects # This data is called using the `pageProjects.js` collection script
  size: 15
  alias: projects

date: 2025-06-05T21:54:27.631Z
---

<section aria-labelledby="projects-featured" class="projects-featured | flow">
  <h2 id="projects-featured" tabindex="-1">Featured projects <a class="header-anchor" href="#projects-featured">#</a></h2>
  {# List of project pages #}
  <ul role="list" class="projects__list | auto-grid | no-list">
  {% for project in projects -%}
    <li class="projects__list-item">
      <article class="card card--stacked">
        <div class="card__visual">
          <picture>
            <source type="image/webp" srcset="{{ project.data.image.srcWebp }}">
            <source type="image/jpeg" srcset="{{ project.data.image.srcJpg }}">
            <img src="{{ project.data.image.srcJpg }}"
              alt="{{ project.data.image.alt }}."
              width="{{ project.data.image.width }}"
              height="{{ project.data.image.height }}"
              class="obj-fit"
              {%- if project.data.image.lazyLoad %}
                loading="lazy"
                decoding="async"
              {% endif %}>
          </picture>
        </div>
        <div class="card__content">
          <header class="card__header">
            <h3 class="card__title">
              <a href="{{ project.url }}">
              {{- project.data.title | safe }}
              </a>
            </h3>
          </header>
          <div class="card__body | flow">
            {%- if project.data.summary -%}
              <p>{{ project.data.summary | safe | trim }}</p>
            {%- endif -%}
          </div>
        </div>
      </article>
    </li>
  {% endfor -%}
  </ul>
</section>

---

<section aria-labelledby="projects-other" class="projects-other | flow">
  <h2 id="projects-other" tabindex="-1">I have also worked with <a class="header-anchor" href="#projects-other">#</a></h2>
  <ul role="list" class="auto-grid | no-list">
    <li>
      <article class="card card--stacked">
        <div class="card__content">
          <header class="card__header">
            <h3 class="card__title">Avios <a href="#fn:avios" class="footnote" rel="footnote"><sup>*</sup></a></h3>
            <span class="date-time">Year: 2004 - 2015 <small>(permanent)</small></span>
          </header>
          <div class="card__body">
            <ul class="flow">
              <li>Built ecommerce frontend solutions for Airmiles and Avios, mentored front-end developers and collaborated with back-end teams (Spring application and Oracle-based <abbr title="Content Management System.">CMS</abbr>) to ensure accurate, standards-compliant implementation.</li>
              <li>Led the adoption of web standards and accessibility, delivering stable, inclusive websites and personalised digital experiences.</li>
              <li>Worked in an Agile workflow, collaborated with stakeholders, UX designers, developers, and testers to deliver engaging digital solutions.</li>
            </ul>
          </div>
          <footer class="card__footer | flow">
            <p>Visit them at <a href="https://www.avios.com/en-GB">www.avios.com</a></p>
            <p id="fn:avios"><sup>*</sup> Formerly a subsidiary of British Airways and also known as <a href="https://en.wikipedia.org/wiki/Air_Miles#Air_Miles_United_Kingdom">Airmiles</a>. Avios is now the loyalty currency run by <a href="https://iagloyalty.com">IAG Loyalty</a>.</p>
          </footer>
        </div>
      </article>
    </li>
    <li>
      <article class="card card--stacked">
        <div class="card__content">
          <header class="card__header">
            <h3 class="card__title">IAG Loyalty</h3>
            <span class="date-time">Year: 2018 &ndash; 2021 <small>(contract)</small></span>
          </header>
          <div class="card__body">
            <ul class="flow">
              <li>Developed high performance <abbr title="Progressive Web Application.">PWA</abbr> <abbr title="Business-to-business.">B2B</abbr> websites for them.</li>
              <li>Played a key role in exploring, strategising, and implementing a scalable <abbr title="Software as a Service.">SaaS</abbr> micro-frontend setup that prioritised reusable, themeable, and customisable components.</li>
              <li>Developed a custom, JSON-based, themeable design token system to scale design and UI consistently across web platforms and applications in a technology-agnostic way.</li>
            </ul>
          </div>
          <footer class="card__footer">
            <p>Visit them at <a href="https://www.iagloyalty.com/">www.iagloyalty.com</a></p>
          </footer>
        </div>
      </article>
    </li>
    <li>
      <article class="card card--stacked">
        <div class="card__content">
          <header class="card__header">
            <h3 class="card__title">Time Inc. UK <a href="#fn:time-inc" class="footnote" rel="footnote"><sup>*</sup></a></h3>
            <span class="date-time">Year: 2016 <small>(contract)</small></span>
          </header>
          <div class="card__body">
            <ul class="flow">
              <li>Collaborated with the incumbent team to develop a dynamic, adaptable WordPress Multisite solution supporting customizable themes.</li>
              <li>Enabled rapid website creation and deployment for renowned brands, including <strong>Marie Claire</strong>, <strong>Homes & Gardens</strong>, <strong>Country Life</strong>, and <strong>Decanter</strong>.</li>
            </ul>
          </div>
          <footer id="fn:time-inc" class="card__footer">
            <p><sup>*</sup> Since I last worked with them, they've now been taken over by <a href="https://www.futureplc.com/">Future plc</a>.</p>
          </footer>
        </div>
      </article>
    </li>
    <li>
      <article class="card card--stacked">
        <div class="card__content">
          <header class="card__header">
            <h3 class="card__title">Pegasus <a href="#fn:pegasus" class="footnote" rel="footnote"><sup>*</sup></a></h3>
            <span class="date-time">Year: 2016 <small>(contract)</small></span>
          </header>
          <div class="card__body">
            <ul class="flow">
              <li>Developed & enhanced brochure websites for Pegasus' healthcare clients.</li>
              <li>Client projects at the time where for <strong>Cetraben</strong>, <strong>Rapid White</strong> and <strong>Movelat</strong>.</li>
            </ul>
          </div>
          <footer id="fn:pegasus" class="card__footer">
            <p><sup>*</sup> Since I last worked with them, they've become <a href="https://www.inizioevoke.com/">Inizio Evoke</a>.</p>
          </footer>
        </div>
      </article>
    </li>
    <li>
      <article class="card card--stacked">
        <div class="card__content">
          <header class="card__header">
            <h3 class="card__title">Macmillan Cancer Support</h3>
            <span class="date-time">Year: 2015 <small>(contract)</small></span>
          </header>
          <div class="card__body">
            <ul class="flow">
              <li>Worked with Macmillan's core website application team on frontend solutions for their brand identity and business proposition.</li>
              <li>Actively engaged in internal Hackathon days, contributing, and presenting innovative ideas.</li>
            </ul>
          </div>
          <footer class="card__footer">
            <p>Visit them at <a href="https://www.macmillan.org.uk/">www.macmillan.org.uk</a></p>
          </footer>
        </div>
      </article>
    </li>
  </ul>
</section>

---

{% from "components/core/blockquotes/blockquotes.njk" import blockquote %}

<section aria-labelledby="projects-testimonials" class="projects-testimonials | flow">
  <h2 id="projects-testimonials" tabindex="-1">Nice things people have said <a class="header-anchor" href="#projects-testimonials">#</a></h2>
  <ul role="list" class="auto-grid | no-list">
    <li>
    {%- call blockquote('Stephen Scott, Chief Digital Officer', 'https://www.iagloyalty.com', 'IAG Loyalty') -%}
      Bruce is a true digital native. Starting in the industry back as far as Boo.com and continually striving to push the boundaries of front end code design. He takes it upon himself to continually keep up to date with the latest trends and to apply that to his work to the benefit of whoever he is working for.

      I have no hesitation in recommending Bruce for any role in which pushing your digital boundaries is at the core of your agenda.
    {%- endcall %}
    </li>
    <li>
    {%- call blockquote('Paul Davison, Head Of Design', 'https://charanga.com', 'Charanga Music') -%}
      We got Bruce in to to help us develop a front-end boilerplate / component library as we were inundated with projects and needed a safe pair of hands that could help us achieve quality results with minimal supervision.

      Bruce delivered a high-quality framework that ticks all of the boxes for us. And to top it all he’s a great guy to work with, highly professional, he gets on well with everyone and really cares about his work. I would not hesitate to hire Bruce again.
    {%- endcall %}
    </li>
    <li>
    {%- call blockquote('Nicola Chrome, Senior Media and Content Marketing Manager, <a href="https://www.avios.com/en-GB">Avios</a>. <em>(Currently, "Founder" of <a href="https://www.relocatedownunder.com/">Relocate Down Under</a>)</em>') -%}
      I worked with Bruce for many years at Avios, both within the same team and across projects. Bruce was incredibly knowledgeable in website design and development, always came up with great solutions, delivered to a high standard with great attention to detail, and was very easy to work with.

      He was also able to communicate his technical knowledge in a straightforward way to someone who was not from a technical background. I would highly recommend Bruce to any organisation.
    {%- endcall %}
    </li>
    <li>
    {%- call blockquote('Roger Mathews, Head of System Development and Administration, <a href="https://www.macmillan.org.uk/">Macmillan Cancer Support</a>. <em>(Currently, "Chief Technology Officer" at <a href="https://www.icr.ac.uk/">The Institute of Cancer Research</a>)</em>') -%}
      Bruce is a great addition to any team, a great personality who requires minimal management and produces accurate and attractive output. He keeps up to date with the latest techniques and is happy to share those skills with others.

      I wouldn't hesitate in giving Bruce another opportunity when one arises.
    {%- endcall %}
    </li>
  </ul>
</section>

---

<h2 id="cv" tabindex="-1" class="visually-hidden">Need a copy of my CV? <a class="header-anchor" href="#cv">#</a></h2>

Need to see a copy of my CV for some reason? You're welcome to <span class="nowrap">[download a copy](/BruceTaylorCV)</span>. { .call-out }
