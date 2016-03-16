---
layout: page
title: Shane Logsdon
menu_label: Home
menu_weight: 0
redirect_from:
 - /m/
---

{% include brief-personal-info.html %}

## Recent Projects

{% for project in site.data.projects limit: 3 %}
  {% include project-listing.html project=project %}
{% endfor %}

[All Projects]({{ '/projects/' | prepend: site.base_url }})

## Recent Posts

{% for post in site.posts limit: 3 %}
  {% include post-listing.html post=post %}
{% endfor %}

[All Posts]({{ '/posts/' | prepend: site.base_url }})
