---
layout: page
title: Projects
menu_weight: 1
---

<section class="project-list">
  {% for project in site.data.projects %}
    {% include project-listing.html project=project %}
  {% endfor %}
</section>

Find more under [my GitHub profile](https://github.com/{{ site.github.username }}).
