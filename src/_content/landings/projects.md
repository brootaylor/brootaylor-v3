---
title: "Projects"
# Populates the `meta description` for a page
summary: "I help businesses build user-friendly, responsive, accessible, and resilient websites that are built on strong foundations for lasting impact."
# Populates the opening / `lead` text on a page
lead:
  - I help businesses build user-friendly, responsive, accessible, and resilient websites that are built on strong foundations for lasting impact.
  - Need some help with your next project? <a href="/contact">Get in touch</a>.

bodyClass: "projects-home"

permalink: "{% if pagination.pageNumber > 0 %}/projects/{{ pagination.pageNumber + 1 }}/index.html{% else %}/projects.html{% endif %}"

pagination:
  data: collections.pageProjects # This data is called using the `pageProjects.js` collection script
  size: 15
  alias: projects

date: 2024-02-14T17:29:00
---

<section aria-labelledby="projects-select" class="companies | flow">
  <h2 id="projects-select" tabindex="-1">Selected projects <a class="header-anchor" href="#projects-select">#</a></h2>
  {# List of project pages #}
  <ul role="list" class="projects__list | auto-grid | no-list">


  {% for project in projects -%}
    <li class="projects__list-item">
      <article class="card card--stacked{% if project.data.highlighted %} call-out{% endif %}">
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

{% from "components/core/blockquotes/blockquotes.njk" import blockquote %}
<section aria-labelledby="testimonials" class="testimonials | flow">
  <h2 id="testimonials" tabindex="-1">Nice things people have said <a class="header-anchor" href="#testimonials">#</a></h2>
  <ul role="list" class="auto-grid | no-list">
    <li>
    {%- call blockquote('Stephen Scott, Chief Digital Officer', 'https://www.iagloyalty.com', 'IAG Loyalty') -%}
      Bruce is a true digital native. Starting in the industry back as far as Boo.com and continually striving to push the boundaries of front end code design. He takes it upon himself to continually keep up to date with the latest trends and to apply that to his work to the benefit of whoever he is working for. I have no hesitation in recommending Bruce for any role in which pushing your digital boundaries is at the core of your agenda.
    {%- endcall %}
    </li>
    <li>
    {%- call blockquote('Paul Davison, Head Of Design', 'https://charanga.com', 'Charanga Music') -%}
      We got Bruce in to to help us develop a front-end boilerplate / component library as we were inundated with projects and needed a safe pair of hands that could help us achieve quality results with minimal supervision. Bruce delivered a high-quality framework that ticks all of the boxes for us. And to top it all he’s a great guy to work with, highly professional, he gets on well with everyone and really cares about his work. I would not hesitate to hire Bruce again.
    {%- endcall %}
    </li>
  </ul>
</section>

---

<h2 id="cv" tabindex="-1" class="visually-hidden">Need a copy of my CV? <a class="header-anchor" href="#cv">#</a></h2>

**Need a copy of my CV for some reason?** You're welcome to [download a copy here](/BruceTaylorCV). { .call-out }
