---
title: "Blogroll"
# Populates the `meta description` for a page
summary: "A list of blogs and newsletters I visit and reference regularly."
# Populates the opening / `lead` text on a page
lead:
  - A list of blogs and newsletters I visit and reference regularly.

bodyClass: "blogroll-home"

tags: "page" # This `page` tag is here so that the service worker picks them up. These pages are picked up in the `mainnav` or `footernav` loops

date: 2024-03-07T18:00:27.631Z
---

<ul role="list" class="blogroll__list | auto-grid | no-list">
{% for blog in blogData -%}
  <li>
    <article class="card card--stacked">
      <div class="card__content">
        <header class="card__header">
          <h2 class="card__title">
            <img alt="" src="{{ blog.favicon }}" width="16" height="16" loading="lazy" decoding="async">
            <a href="{{ blog.url }}">
              {{- blog.name -}}
            </a>
          </h2>
          <small><em>{{ blog.cleansedUrl }}</em></small>
        </header>
        {%- if blog.description -%}
          <div class="card__body">
          <p>{{ blog.description | safe }}</p>
        </div>
        {%- endif -%}
      </div>
    </article>
  </li>
{% endfor -%}
</ul>
