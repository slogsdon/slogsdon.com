<?php
$categories = json_decode(file_get_contents('resources/data/categories.json'));
?>
<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div>
                <h3>Navigation</h3>
                <?php $this->insert('partials::components/site-menu', ['isFooter' => true]); ?>
            </div>
            <div>
                <h3>Topics</h3>
                <ul class="footer-links">
                    <?php foreach ($categories as $catSlug => $catTitle): ?>
                        <li><a href="/articles/<?= $catSlug ?>/"><?= $catTitle ?></a></li>
                    <?php endforeach; ?>
                </ul>
            </div>
            <div>
                <h3>Connect</h3>
                <?php $this->insert('partials::components/social-links', ['isFooter' => true]); ?>
            </div>
        </div>
    </div>
</footer>
