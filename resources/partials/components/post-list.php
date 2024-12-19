<?php
$settings = require('resources/settings.php');
$posts = (array)json_decode(file_get_contents(sprintf('resources/data/%s-list.json', $slug)));
$shouldLimitPosts = isset($limit) && $limit > 0;
if ($shouldLimitPosts === true) {
    $count = 0;
}
$postHeaderElement = $shouldLimitPosts ? 'h3' : 'h2';
if (isset($filterByTopic)) {
    $posts = array_filter($posts, function ($post) use ($filterType, $filterByTopic) {
        if ($filterType === 'tag') {
            return is_array($post->tags) && in_array($filterByTopic, $post->tags);
        } else {
            return $filterByTopic === $post->category;
        }
    });
}
$allCategories = json_decode(file_get_contents('resources/data/categories.json'), true);
$allTags = json_decode(file_get_contents('resources/data/tags.json'), true);
?>

<section class="article-list">
    <?php if (count($posts) === 0): ?>
        <p>Sorry! There isn't anything here yet.</p>
    <?php endif; ?>

    <?php foreach ($posts as $postSlug => $post) : ?>
        <article class="article">
            <<?= $postHeaderElement ?> class="title">
                <a href="/<?= $slug; ?>/<?= $post->category ?>/<?= $postSlug; ?>/"><?= $post->title; ?></a>
            </<?= $postHeaderElement ?>>
            <p class="article-excerpt"><?= $post->description; ?></p>
            <div class="article-meta">
                <?php if (isset($post->date)): ?>
                    <span class="publish-date"><?= DateTime::createFromFormat('Y-m-d', $post->date)->format('F j, Y'); ?></span>
                <?php endif; ?>
                <?php if ('articles' === $slug): ?>
                    <?php $content = file_get_contents(sprintf('pages/articles/%s/%s.md', $post->category, $postSlug)); ?>
                    <span class="read-time"><?= ceil(str_word_count(strip_tags($content)) / $settings->avgWordsPerMinute) ?> min read</span>
                <?php endif; ?>
                <?php if (isset($post->category)): ?>
                    <span class="category">
                        <a href="/<?= $slug ?>/<?= $post->category ?>/"><?= $allCategories[$post->category] ?></a>
                    </span>
                <?php endif; ?>
            </div>
            <?php if (isset($post->tags)): ?>
                <div class="article-footer">
                    <span class="tag-header">Tags:</span>
                    <?php foreach ($post->tags as $tag): ?>
                        <span class="tag">
                            <a href="/<?= $slug ?>/tags/<?= $tag ?>/"><?= $allTags[$tag] ?></a>
                        </span>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </article>
        <?php if ($shouldLimitPosts && $limit === ++$count) { break; } ?>
    <?php endforeach; ?>
</section>
