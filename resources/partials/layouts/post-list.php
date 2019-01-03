<?php
$this->layout('partials::layouts/main', [
    'title' => $title,
]);
$posts = json_decode(file_get_contents(sprintf('resources/data/%s-list.json', $slug)));
?>

<style>
    .entry {
        margin-bottom: 2rem;
    }
</style>
<main class="container" aria-labelledby="title">
    <h1 id="title"><?= $title; ?></h1>

    <?php foreach ($posts as $postSlug => $post) : ?>
        <article class="entry">
            <h2 class="title">
                <a href="/<?= $slug; ?>/<?= $postSlug; ?>"><?= $post->title; ?></a>
            </h2>
            <p class="description"><?= $post->description; ?></p>
        </article>
    <?php endforeach; ?>
</main>
