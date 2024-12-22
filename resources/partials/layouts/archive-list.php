<?php
$this->layout('partials::layouts/main', [
    'title' => $title,
    'slug' => $slug,
]);
?>

<div class="archive-section">
    <header class="page-header">
        <div class="container" class="archive-heading">
            <h1 id="title"><?= $title; ?></h1>
            <p>
                For various reasons, these pieces of content have been archived and maintained here for 
                historical reference. While the core concepts may still be relevant, specific technical 
                details may be outdated.
            </p>
        </div>
    </header>

    <main class="container">
        <?php $this->insert('partials::components/archive-list', [
            'slug' => $slug,
        ]); ?>
    </main>
</div>
