<?php $this->layout('partials::layouts/master', [
    'title' => !empty($title) ? $title : null,
    'description' => !empty($description) ? $description : null,
    'url' => !empty($url) ? $url : null,
]); ?>

<nav class="nav-container">
    <div class="container">
        <div class="nav-content">
            <a href="/" class="site-logo">SL</a>
            <?php $this->insert('partials::components/site-menu'); ?>
        </div>
    </div>
</nav>

<?= $this->section('content'); ?>

<?php $this->insert('partials::components/footer'); ?>
