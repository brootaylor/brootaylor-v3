---
title: "Bookmarks"
# Populates the `meta description` for a page
summary: "Links to articles, websites, videos and various online resources. Technical and non-technical. Quite a few of them offer perspectives I appreciate."
# Populates the opening / `lead` text on a page
lead:
  - "Links to articles, websites, videos and various online resources. Technical and non-technical. Quite a few of them offer perspectives I appreciate."

bodyClass: "bookmarks-home"

permalink: "{% if pagination.pageNumber > 0 %}/bookmarks/{{ pagination.pageNumber + 1 }}/index.html{% else %}/bookmarks.html{% endif %}"

pagination:
  data: collections.postBookmarks # This data is called using the `postBookmarks.js` collection script
  size: 15
  alias: bookmarks

date: 2024-03-05T16:59:00
---

{# List of bookmark posts #}
<ul role="list" class="bookmarks__list | no-list | flow">
{% for bookmark in bookmarks -%}
  <li class="bookmarks__list-item">
    <article class="bookmarks__summary | flow">
      <h2>
        <a href="{{ bookmark.url }}">
        {{- bookmark.data.title | safe }}
        {#- Checks whether a `bookmarkAuthor` value has been entered. If so, then the `h2` heading is updated... -#}
        {% if bookmark.data.bookmarkAuthor %}<span class="visually-hidden"> &mdash; written by</span><i aria-hidden="true"> &rarr;</i> <em>{{ bookmark.data.bookmarkAuthor | safe }}</em>{% endif -%}
        </a>
      </h2>
      <time datetime="{{ bookmark.date | dateTime }}">{{ bookmark.date | dateTimeReadable("d LLLL y, ") }}{{ bookmark.date | dateTimeReadable("t") | lower }}</time>
      <div class="bookmarks__original"><span class="visually-hidden">Original source can be viewed at</span> <i aria-hidden="true">&rarr;</i> <a href="{{ bookmark.data.bookmarkExternal }}" rel="external" title="Link to the original source.">{{ bookmark.data.bookmarkLabel }}</a></div>
    </article>
  </li>
{% endfor -%}
</ul>

{# Pagination component --> (Maybe export this to its own component at some stage) #}
<nav class="pagination">
  <h3 class="visually-hidden">Pagination for bookmark posts</h3>
  <span class="visually-hidden">Page: {{ pagination.pageNumber + 1 }} of {{ pagination.links | length  }}</span>
  <ul role="list" class="pagination__list | no-list">
    {% if pagination.nextPageHref -%}
      <li class="pagination__list-item">
        <i aria-hidden="true">&larr;</i>
        <a href="{{ pagination.nextPageHref }}">Older <span class="visually-hidden">posts</span></a>
      </li>
    {%- endif %}
    {%- if pagination.previousPageHref -%}
      <li class="pagination__list-item">
        <a href="{{ pagination.previousPageHref }}">Newer <span class="visually-hidden">posts</span></a>
        <i aria-hidden="true">&rarr;</i>
      </li>
    {%- endif %}
  </ul>
</nav>
