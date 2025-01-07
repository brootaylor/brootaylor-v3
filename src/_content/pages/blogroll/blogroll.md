---
title: "Blogroll"
# Populates the `meta description` for a page
summary: "A list of blogs and newsletters I visit and reference fairly regularly."
# Populates the opening / `lead` text on a page
lead:
  - A list of blogs and newsletters I visit and reference fairly regularly.

bodyClass: "blogroll"

tags: "page" # This `page` tag is here so that the service worker picks them up. These pages are picked up in the `mainnav` or `footernav` loops

date: 2025-01-07T17:47:04.180Z
---

<ul role="list" class="blogroll__list | auto-grid | no-list">
{# Shuffle the generated order of these blogroll entries... #}
{% set shuffled_blogs = blogData | shuffle %}
{% for blog in shuffled_blogs -%}
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
        {%- if blog.description %}
        <div class="card__body">
          <p>{{ blog.description | safe }}</p>
        </div>
        {%- endif %}
      </div>
    </article>
  </li>
{% endfor -%}
</ul>
