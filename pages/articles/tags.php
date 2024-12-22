<?php
$title = 'Article Tags';
$this->layout('partials::layouts/main', [
    'title' => $title,
]);
$tags = json_decode(file_get_contents('resources/data/tags.json'));
$posts = (array)json_decode(file_get_contents("resources/data/articles-list.json"));
$countsByTag = array_reduce($posts, function ($result, $post) use ($tags) {
    foreach ($tags as $tag => $label) {
        if (!isset($result[$tag])) {
            $result[$tag] = 0;
        }

        if (is_array($post->tags) && in_array($tag, $post->tags)) {
            $result[$tag] += 1;
        }
    }
    return $result;
}, []);
?>

<header class="page-header">
    <div class="container">
        <h1 id="title"><?= $title; ?></h1>
    </div>
</header>

<div class="tag-listing">
  <div class="tag-filter">
    <div class="tag-list" id="tagList">
      <!-- Tags will be inserted here by JavaScript -->
    </div>
  </div>
  <button class="show-more-btn" id="showMoreBtn" style="display: none;">
    Show More
  </button>
</div>


<main class="container">
    <ul class="tag-list">
        <?php foreach ($tags as $tag => $label): ?>
            <li>
                <a class="tag" href="/articles/tags/<?= $tag ?>/">
                    <span class="tag-label"><?= $label ?></span>
                    <span class="tag-count"><?= $countsByTag[$tag] ?></span>
                </a>
            </li>
        <?php endforeach; ?>
    </ul>
</main>


<style>
/* Tag Listing Specific Styles */
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  list-style: none;
}

.tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  background-color: var(--light-gray);
  border-radius: 2rem;
  border: none;
  color: var(--text-color);
  font-size: 0.95rem;
  cursor: pointer;
}

.tag-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.5rem;
  height: 1.5rem;
  padding: 0 0.5rem;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  font-size: 0.75rem;
}

.tag-label.active .tag-count {
  background-color: rgba(255, 255, 255, 0.2);
}

.show-more-btn {
  background: none;
  border: none;
  color: var(--secondary-color);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: color 0.2s ease;
}

.show-more-btn:hover {
  color: var(--primary-color);
  text-decoration: underline;
}
</style>