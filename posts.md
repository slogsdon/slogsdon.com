---
layout: page
title: Posts
menu_weight: 1
redirect_from:
  - /posts/page/2/
  - /posts/page/3/
  - /posts/page/4/
  - /posts/page/5/
---

<section class="post-list">
  {% for post in site.posts %}
    {% include post-listing.html post=post %}
  {% endfor %}
</section>
