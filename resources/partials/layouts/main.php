<?php $this->layout('partials::layouts/master', [
    'title' => !empty($title) ? $title : null,
]); ?>

<style>
    .container {
        margin: 0 auto;
        max-width: 650px;
        padding: 0 1rem;
    }
    .clear-both {
        clear: both;
    }
    .brand-title {
        float: left;
        font-weight: 700;
        margin: 1rem 0;
        padding: 0;
    }
</style>
<div class="container">
    <header>
        <div class="brand-title">
            <a href="/">SL</a>
        </div>
        <site-menu></site-menu>
        <div class="clear-both"></div>
    </header>
    <?= $this->section('content'); ?>
    <site-footer></site-footer>
</div>
