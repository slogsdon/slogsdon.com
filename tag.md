---
layout: page
title: Tags
menu_hidden: true
---

{% for tag in site.tags %}
  {% assign t = tag | first %}
  {% assign t_url = t | slugify | append: '/' | prepend: '/tag/' | prepend: site.base_url %}
  <article class="post">
    <h2>
      <a class="post-link" href="{{ t_url }}">{{ t }}</a>
    </h2>
  </article>
{% endfor %}
