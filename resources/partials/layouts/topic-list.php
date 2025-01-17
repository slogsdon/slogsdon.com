<?php
if ($topicType === 'tag') {
    $url = sprintf('/%s/tags/%s/', $slug, $topic);
} else {
    $url = sprintf('/%s/%s/', $slug, $topic);
}
$this->layout('partials::layouts/main', [
    'title' => $title,
    'slug' => $slug,
    'url' => !empty($url) ? $url : null,
]);
?>

<header class="page-header">
    <div class="container">
        <h1 id="title"><?= $title; ?></h1>
    </div>
</header>


<main class="container">
    <!-- <section class="topic-filter">
        <div class="topic-list">
            <a href="#" class="topic-link active">All Topics</a>
            <a href="#" class="topic-link">Payment Systems</a>
            <a href="#" class="topic-link">System Architecture</a>
            <a href="#" class="topic-link">Developer Tools</a>
            <a href="#" class="topic-link">Security</a>
        </div>
    </section> -->

    <?php $this->insert('partials::components/post-list', [
        'slug' => $slug,
        'filterByTopic' => $topic,
        'filterType' => $topicType,
    ]); ?>

    <p><a href="/<?= $slug ?>/">< Back to All <?= $slug === 'articles' ? 'Articles & Insights' : 'Speaking Engagements' ?></a>
</main>
