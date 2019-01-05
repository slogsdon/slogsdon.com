<style>
    .menu-container {
        float: right;
    }
    .menu {
        list-style: none;
        margin: 1rem 0;
        padding: 0;
    }
    .menu-item {
        display: inline;
        margin-left: 0.5rem;
    }
    .menu-link {
        color: #000;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
            Helvetica, Helvetica Neue, Ubuntu, Roboto, Noto, Segoe UI, Arial,
            sans-serif;
        font-weight: 500;
        text-decoration: none;
    }
    .menu-link:hover {
        text-decoration: underline;
    }
    .index-page.menu-container, .footer.menu-container {
        float: none;
    }
    .index-page.menu-container .menu-item {
        font-size: 1.5rem;
        margin-left: 0;
        margin-right: 0.75rem;
    }
    .footer.menu-container {
        border-top: 1px solid #e9e9e9;
        margin-top: 1.5rem;
        padding: 3rem 0;
    }
    .footer.menu-item {
        display: inline-block;
        margin: 0;
        margin-right: 1.5rem;
    }
    .footer.menu-link {
        color: #727272;
    }
</style>

<?php
$additionalClasses = '';

if (isset($isIndex)) {
    $additionalClasses .= ' index-page';
}

if (isset($isFooter)) {
    $additionalClasses .= ' footer';
}
?>

<nav class="menu-container<?= $additionalClasses ?>">
    <ul class="menu">
        <?php if (isset($isFooter)) : ?>
            <li class="menu-item">
                <a href="/" class="menu-link">Intro</a>
            </li>
        <?php endif; ?>
        <li class="menu-item">
            <a href="/work/" class="menu-link">Work</a>
        </li>
        <li class="menu-item">
            <a href="/writing/" class="menu-link">Writing</a>
        </li>
        <li class="menu-item">
            <a href="/decks/" class="menu-link">Decks</a>
        </li>
        <?php if (isset($isFooter)) : ?>
            <li class="menu-item">
                <a href="/about/" class="menu-link">About</a>
            </li>
        <?php endif; ?>
    </ul>
</nav>
