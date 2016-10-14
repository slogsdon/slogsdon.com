---
layout: page
title: Shane Logsdon
menu_label: Home
menu_weight: 0
redirect_from:
 - /m/
---

## Recent Projects

{% for project in site.data.projects limit: 5 %}
  {% include project-listing.html project=project %}
{% endfor %}

See more under [All Projects]({{ '/projects/' | prepend: site.baseurl }})

## Recent Posts

{% for post in site.posts limit: 5 %}
  {% include post-listing.html post=post %}
{% endfor %}

See more under [All Posts]({{ '/posts/' | prepend: site.baseurl }})

## Recent Presentations

{% assign pages = site.pages | sort: 'date' | reverse %}
{% for presentation in pages limit: 5 %}
  {% unless presentation.tags contains 'talk' %}{% continue %}{% endunless %}
  {% include presentation-listing.html presentation=presentation %}
{% endfor %}

See more under [All Presentations]({{ '/presentations/' | prepent: site.baseurl }})
