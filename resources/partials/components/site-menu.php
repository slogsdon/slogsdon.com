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
