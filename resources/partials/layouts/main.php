<?php $this->layout('partials::layouts/master', [
    'title' => !empty($title) ? $title : null,
]); ?>

<header>
    <div class="container">
        <div class="brand-title">
            <a href="/">SL</a>
        </div>
        <?php $this->insert('partials::components/site-menu'); ?>
    </div>
</header>
<div class="container">
    <?= $this->section('content'); ?>
</div>
<footer>
    <div class="container">
        <?php $this->insert('partials::components/site-menu', ['isFooter' => true]); ?>
    </div>
</footer>
