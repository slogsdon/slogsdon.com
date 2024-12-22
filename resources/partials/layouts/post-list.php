<?php
$this->layout('partials::layouts/main', [
    'title' => $title,
    'slug' => $slug,
    'url' => sprintf('/%s/', $slug),
]);
?>

<header class="page-header">
    <div class="container">
        <h1 id="title"><?= $title; ?></h1>
        <p>Deep dives into fintech architecture, developer platforms, and technical leadership.</p>
    </div>
</header>


<main class="container">
    <?php $this->insert('partials::components/post-list', [
        'slug' => $slug,
    ]); ?>
</main>
