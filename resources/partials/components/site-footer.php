<?php /** hi */ ?>
<template id="template-site-footer">
    <style>
        .menu-container {
            border-top: 1px solid #e9e9e9;
            margin-top: 1.5rem;
            padding: 3rem 0;
        }
        .menu {
            font-weight: 500;
            list-style: none;
            margin: 1rem 0;
            padding: 0;
        }
        .menu-item {
            display: inline-block;
            margin: 0;
            margin-right: 1.5rem;
        }
        .menu-link {
            color: #727272;
            text-decoration: none;
        }
        .menu-link:hover {
            text-decoration: underline;
        }
    </style>
    <footer class="menu-container">
        <ul class="menu">
            <li class="menu-item">
                <a href="/" class="menu-link">Intro</a>
            </li>
            <li class="menu-item">
                <a href="/work/" class="menu-link">Work</a>
            </li>
            <li class="menu-item">
                <a href="/writing/" class="menu-link">Writing</a>
            </li>
            <li class="menu-item">
                <a href="/decks/" class="menu-link">Decks</a>
            </li>
            <li class="menu-item">
                <a href="/about/" class="menu-link">About</a>
            </li>
        </ul>
    </footer>
</template>
<script type="module" defer>
    import { CustomElement } from "/js/lib.js";
    class SiteFooter extends CustomElement {
        static get is() { return "site-footer"; }
        get templateSource() { return "template-site-footer"; }
    }
    SiteFooter.register();
</script>
