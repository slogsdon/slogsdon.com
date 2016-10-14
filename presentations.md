---
title: Presentations
layout: page
menu_weight: 3
---

<section class="presentation-list">
  {% assign pages = site.pages | sort: 'date' | reverse %}
  {% for presentation in pages %}
    {% unless presentation.tags contains 'talk' %}{% continue %}{% endunless %}
    {% include presentation-listing.html presentation=presentation %}
  {% endfor %}
</section>

Other presentations:

- [On GitHub](https://github.com/slogsdon?page=1&tab=repositories&utf8=%E2%9C%93&q=presentation)
- [On SpeakerDeck](https://speakerdeck.com/slogsdon)
