<?php $settings = require('resources/settings.php'); ?>
<?php $this->layout('partials::layouts/main', [
    'title' => 'About',
    'url' => '/',
]); ?>

<header class="hero">
    <div class="container">
        <h1 class="title"><?= $settings->title; ?></h1>
        <h2 class="subtitle"><?= $settings->subtitle; ?></h2>
        <p class="description"><?= $settings->description ;?></p>
    </div>
</header>

<main class="container">
    <section class="featured-articles">
        <h2 class="section-title">Featured Articles</h2>
        <?php
        $this->insert('partials::components/post-list', [
            'slug' => 'articles',
            'limit' => 3,
        ]);
        ?>
        <p><a href="/articles/">Discover More Articles</a>
    </section>
</main>

<?php $this->insert('partials::components/contact-cta'); ?>
