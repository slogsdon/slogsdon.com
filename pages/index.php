<?php $settings = require('resources/settings.php'); ?>
<?php $this->layout('partials::layouts/master'); ?>

<style>
    .container {
        margin: 10rem auto;
        max-width: 650px;
        padding: 0 0.5rem;
    }
    .title {
        font-size: 3rem;
    }
    .description {
        font-size: 1.5rem;
        line-height: 2rem;
    }
</style>
<main class="container">
    <h1 class="title"><?= $settings->title; ?></h1>
    <p class="description"><?= $settings->description; ?></p>
    <site-menu is-index></site-menu>
</main>
