<?php $this->layout('partials::layouts/main', [
    'title' => !empty($title) ? $title : null,
]); 
$settings = require('resources/settings.php');
$allCategories = json_decode(file_get_contents('resources/data/categories.json'), true);
$allTags = json_decode(file_get_contents('resources/data/tags.json'), true);
$allPosts = array_merge(
    json_decode(file_get_contents("resources/data/articles-list.json"), true),
    json_decode(file_get_contents("resources/data/speaking-list.json"), true)
);
$meta = (object)($allPosts[$slug]);
?>

<main>
    <article>
        <header class="article-header">
            <div class="container">
                <h1 id="title"><?= $title; ?></h1>
                <div class="article-meta">
                    <?php $date = DateTime::createFromFormat('U', $date)->format('F j, Y') ?>
                    <span class="publish-date"><?= $date ?></span>
                    <span class="read-time"><?= ceil(str_word_count(strip_tags($content)) / $settings->avgWordsPerMinute) ?> min read</span>
                    <span class="category"><?= isset($meta->category) ? $allCategories[$meta->category] : '' ?></span>
                </div>
                <div class="tags">
                    <span class="tag-header">Tags:</span>
                    <?php foreach ($meta->tags as $tag): ?>
                        <span class="tag"><?= $allTags[$tag] ?></span>
                    <?php endforeach; ?>
                </div>
            </div>
        </header>

        <div class="container">
            <?php if (isset($meta->archived) && $meta->archived === true): ?>
                <div class="archive-banner">
                    <div class="archive-icon">📚</div>
                    
                    <!-- Main Message -->
                    <div class="archive-message">
                        <h4>Historical Content</h4>
                        <p>This article was published on <span class="archive-date"><?= $date ?></span> and is maintained for historical reference. While the core concepts may still be relevant, specific technical details may be outdated.</p>
                    </div>

                    <!-- Call to Action -->
                    <!-- <div class="archive-cta">
                        <p>For current content about [TOPIC], see:</p>
                        <ul>
                        <li><a href="#">[Related Modern Article 1]</a></li>
                        <li><a href="#">[Related Modern Article 2]</a></li>
                        </ul>
                    </div> -->
                </div>
            <?php endif; ?>

            <div class="article-content">
                <?= $content ?: $this->section('content'); ?>
            </div>

            <section class="author-bio">
                <div class="bio-header">
                    <div class="bio-avatar">
                        <img src="/images/headshot.jpeg">
                    </div>
                    <div>
                        <div class="bio-name"><?= $settings->author->shane->name ?></div>
                        <div class="bio-title"><?= $settings->author->shane->title ?></div>
                    </div>
                </div>
                <p><?= $settings->author->shane->description ?></p>
            </section>

            <section class="article-comments">
                <script src="https://utteranc.es/client.js"
                        repo="slogsdon/shane.logsdon.io"
                        issue-term="pathname"
                        theme="github-light"
                        <?php if ($_SERVER['SERVER_NAME'] !== 'localhost'): ?>
                            crossorigin="anonymous"
                        <?php endif; ?>
                        async>
                </script>
            </section>
        </div>
    </article>
</main>
