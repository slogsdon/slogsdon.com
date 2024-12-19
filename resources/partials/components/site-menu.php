
<ul class="menu <?= isset($isFooter) ? 'footer-links' : 'nav-menu' ?>">
    <?php if (isset($isFooter)) : ?>
        <li class="menu-item">
            <a href="/" class="menu-link">Intro</a>
        </li>
    <?php endif; ?>
    <li class="menu-item">
        <a href="/about/" class="menu-link">About</a>
    </li>
    <li class="menu-item">
        <a href="/articles/" class="menu-link">Articles</a>
    </li>
    <li class="menu-item">
        <a href="/speaking/" class="menu-link">Speaking</a>
    </li>
    <!--
    <li class="menu-item">
        <a href="/work/" class="menu-link">Work</a>
    </li>
    <li><a href="/consulting">Consulting</a></li>
    -->
    <?php if (isset($isFooter)) : ?>
        <li class="menu-item">
            <a href="/contact/" class="menu-link">Contact</a>
        </li>
    <?php endif; ?>
</ul>
