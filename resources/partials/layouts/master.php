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
<?php if (!empty($url)): ?>
  <link rel="canonical" href="https://shane.logsdon.io<?= $this->e($url); ?>">
<?php endif; ?>

<style id="site"><?= file_get_contents('public/_/site.css') ?></style>
<style id="hljs-atom-one"><?= file_get_contents('public/_/hljs-atom-one.css') ?></style>
<?php if (!isset($_SERVER['SERVER_NAME']) || $_SERVER['SERVER_NAME'] !== 'localhost'): ?>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-9Y89SVEQW9"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-9Y89SVEQW9');
  </script>
<?php endif; ?>

<body aria-labelledby="title">
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
