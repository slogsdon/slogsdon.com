---
layout: page
title: Tags
menu_hidden: true
---

{% capture tagString %}{% for tag in site.tags %}{{ tag[0] }}{% unless forloop.last %}|{% endunless %}{% endfor %}{% endcapture %}
{% assign tags = tagString | split: '|' | sort %}
{% for tag in tags %}
  {% assign t_url = tag | slugify | append: '/' | prepend: '/tag/' | prepend: site.baseurl %}
  <article class="post dib">
    <h2 class="dib ma2">
      <a class="post-link" href="{{ t_url }}">{{ tag }}</a>
    </h2>
  </article>
{% endfor %}
