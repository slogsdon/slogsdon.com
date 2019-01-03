<?php /** hi */ ?>
<template id="template-site-menu">
    <style>
        .menu-container {
            float: right;
        }
        .menu {
            font-weight: 500;
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
            text-decoration: none;
        }
        .menu-link:hover {
            text-decoration: underline;
        }
        .index-page.menu-container {
            float: none;
        }
        .index-page.menu-container .menu-item {
            font-size: 1.5rem;
            margin-left: 0;
            margin-right: 0.75rem;
        }
    </style>
    <nav class="menu-container">
        <ul class="menu">
            <li class="menu-item">
                <a href="/work/" class="menu-link">Work</a>
            </li>
            <li class="menu-item">
                <a href="/writing/" class="menu-link">Writing</a>
            </li>
            <li class="menu-item">
                <a href="/decks/" class="menu-link">Decks</a>
            </li>
        </ul>
    </nav>
</template>
<script type="module" defer>
    import { CustomElement } from "/js/lib.js";
    class SiteMenu extends CustomElement {
        static get is() { return "site-menu"; }
        get templateSource() { return "template-site-menu"; }
        connectedCallback() {
            super.connectedCallback();
            if (!this.hasAttribute("is-index")) {
                return;
            }

            const nav = this.shadowRoot.querySelector(".menu-container");

            if (!nav) {
                return;
            }

            nav.classList.add("index-page")
        }
    }
    SiteMenu.register();
</script>
