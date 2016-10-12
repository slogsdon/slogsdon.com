---
layout: page
title: Posts
menu_weight: 1
---

<section class="post-list">
  {% for post in site.posts %}
    {% include post-listing.html post=post %}
  {% endfor %}
</section>
