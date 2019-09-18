<?php $this->layout('partials::layouts/master', [
    'title' => !empty($title) ? $title : null,
]); ?>

<div class="container">
    <header>
        <div class="brand-title">
            <a href="/">SL</a>
        </div>
        <?php $this->insert('partials::components/site-menu'); ?>
    </header>
    <?= $this->section('content'); ?>
    <?php $this->insert('partials::components/site-menu', ['isFooter' => true]); ?>
</div>
