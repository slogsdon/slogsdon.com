---
layout: page
title: Shane Logsdon
menu_label: Home
menu_weight: 0
---

{% include brief-personal-info.html %}

## Recent Posts

{% for post in site.posts limit: 3 %}
  {% include post-listing.html post=post %}
{% endfor %}
