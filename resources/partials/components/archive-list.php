<?php
$settings = require('resources/settings.php');
$articles = array_map(
    function ($post) { $post->type = 'articles'; return $post; },
    (array)json_decode(file_get_contents("resources/data/articles-list.json"))
);
$speaking = array_map(
    function ($post) { $post->type = 'speaking'; return $post; },
    (array)json_decode(file_get_contents("resources/data/speaking-list.json"))
);
$posts = array_filter(
    array_merge($articles, $speaking),
    function ($post) {
        return $post->archived;
    }
);
uasort($posts, function ($a, $b) {
    return strcmp($b->date, $a->date);
});
$allCategories = json_decode(file_get_contents('resources/data/categories.json'), true);
$allTags = json_decode(file_get_contents('resources/data/tags.json'), true);
$years = array_reduce($posts, function ($result, $post) {
    $year = DateTime::createFromFormat('Y-m-d', $post->date)->format('Y');
    $result[$year] = $year;
    return $result;
}, []);
?>

<nav class="archive-nav">
  <div class="archive-year-select">
    <?php foreach ($years as $year): ?>
        <button class="archive-year-btn"><?= $year ?></button>
    <?php endforeach; ?>
  </div>
</nav>

<section class="archive-content">
    <?php if (count($posts) === 0): ?>
        <p>Sorry! There isn't anything here yet.</p>
    <?php endif; ?>

    <?php foreach ($posts as $postSlug => $post) : ?>
        <?php $year = DateTime::createFromFormat('Y-m-d', $post->date)->format('Y'); ?>
        <article class="archive-article-card" data-year="<?= $year ?>">
            <h2 class="title">
                <a href="/<?= $slug; ?>/<?= $year ?>/<?= $postSlug; ?>/"><?= $post->title; ?></a>
            </h2>
            <p class="archive-description"><?= $post->description; ?></p>
            <div class="article-meta archive-meta-data">
                <?php if (isset($post->date)): ?>
                    <span class="publish-date"><?= DateTime::createFromFormat('Y-m-d', $post->date)->format('F j, Y'); ?></span>
                <?php endif; ?>
                <?php if ('articles' === $post->type): ?>
                    <?php $content = file_get_contents(sprintf('pages/archive/%s/%s.md', $year, $postSlug)); ?>
                    <span class="read-time"><?= ceil(str_word_count(strip_tags($content)) / $settings->avgWordsPerMinute) ?> min read</span>
                <?php endif; ?>
                <?php if (isset($post->category)): ?>
                    <span class="category"><?= $allCategories[$post->category] ?></span>
                <?php endif; ?>
            </div>
            <?php if (isset($post->tags)): ?>
                <div class="archive-tags">
                    <span class="tag-header">Tags:</span>
                    <?php foreach ($post->tags as $tag): ?>
                        <span class="tag"><?= $allTags[$tag] ?></span>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </article>
    <?php endforeach; ?>
</section>

<script type="text/javascript">
    (function () {
        // card hide/show logic
        function updateCards(btn) {
            var targetYear = btn.innerText;

            document.querySelectorAll('.archive-article-card').forEach(function (card) {
                var cardYear = card.getAttribute('data-year');
                card.style.display = cardYear === targetYear ? 'block' : 'none';
            });
        }

        // click handler to trigger card updates
        var btnClass = '.archive-year-btn';
        document.querySelectorAll(btnClass).forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                updateCards(e.target);
                document.querySelectorAll(btnClass).forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
            });
        });

        // initial state
        var btn = document.querySelector(btnClass + ':first-child');
        btn.classList.add('active');
        updateCards(btn);
    })();
</script>
