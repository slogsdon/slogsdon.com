<?php $this->layout('partials::layouts/main', [
    'title' => !empty($title) ? $title : null,
]); ?>

<main aria-labelledby="title">
    <h1 id="title"><?= $title; ?></h1>
    <?= $content ?: $this->section('content'); ?>
</main>
