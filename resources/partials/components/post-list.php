<?php
$settings = require('resources/settings.php');
$posts = (array)json_decode(file_get_contents(sprintf('resources/data/%s-list.json', $slug)));
$shouldLimitPosts = isset($limit) && $limit > 0;
if ($shouldLimitPosts === true) {
    $count = 0;
}
$postHeaderElement = $shouldLimitPosts ? 'h3' : 'h2';
if (isset($filterByTag)) {
    $posts = array_filter($posts, function ($post) use ($filterByTag) {
        return is_array($post->tags) && in_array($filterByTag, $post->tags);
    });
}
$allCategories = json_decode(file_get_contents('resources/data/categories.json'), true);
$allTags = json_decode(file_get_contents('resources/data/tags.json'), true);
?>

<section class="article-list">
    <?php foreach ($posts as $postSlug => $post) : ?>
        <article class="article">
            <<?= $postHeaderElement ?> class="title">
                <a href="/<?= $slug; ?>/<?= $postSlug; ?>"><?= $post->title; ?></a>
            </<?= $postHeaderElement ?>>
            <p class="article-excerpt"><?= $post->description; ?></p>
            <div class="article-meta">
                <?php if (isset($post->date)): ?>
                    <span class="publish-date"><?= DateTime::createFromFormat('Y-m-d', $post->date)->format('F j, Y'); ?></span>
                <?php endif; ?>
                <?php if ('articles' === $slug): ?>
                    <?php $content = file_get_contents('pages/articles/' . $postSlug . '.md'); ?>
                    <span class="read-time"><?= ceil(str_word_count(strip_tags($content)) / $settings->avgWordsPerMinute) ?> min read</span>
                <?php endif; ?>
                <span class="category"><?= isset($post->category) ? $allCategories[$post->category] : '' ?></span>
            </div>
            <?php if (isset($post->tags)): ?>
                <div class="article-footer">
                    <span class="tag-header">Tags:</span>
                    <?php foreach ($post->tags as $tag): ?>
                        <span class="tag"><?= $allTags[$tag] ?></span>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </article>
        <?php if ($shouldLimitPosts && $limit === ++$count) { break; } ?>
    <?php endforeach; ?>
</section>
