<!DOCTYPE html>
<?php $settings = require('resources/settings.php'); ?>

<?php /* start lighthouse */ ?>
<html lang="en" class="no-module">
<meta charset="utf-8">
<title><?= $this->e((!empty($title) ? $title . ' - ' : '') . $settings->title); ?></title>
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<link rel="manifest" href="/manifest.webmanifest">
<meta name="theme-color" content="#000000">
<meta name="description" content="<?= $this->e(!empty($description) ? $description : $settings->description); ?>">
<?php /* end lighthouse */ ?>

<style id="blank-css"><?= file_get_contents('https://slogsdon.github.io/blank/blank.css?' . uniqid()) ?></style>
<style id="site-overrides"><?= file_get_contents('public/_/site-overrides.css') ?></style>
<style id="hljs-atom-one-light"><?= file_get_contents('public/_/hljs-atom-one-light.css') ?></style>

<?php /* start content */ ?>
<?= $this->section('content'); ?>
<?php /* end content */ ?>

<?php /* start scripts */ ?>
<script type="module">
    document.getElementsByTagName('html')[0]
        .classList.remove('no-module');
</script>
<script>
    ('serviceWorker' in navigator)
        && navigator.serviceWorker
            .register('/sw.js')
            .catch(() => {});
</script>
<?php /* end scripts */ ?>
