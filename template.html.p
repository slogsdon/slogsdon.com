<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Shane Logsdon" />
    <meta name="twitter:card" content="summary"/>
    ◊when/block[(select-from-metas 'description here)]{
      <meta name="description" content="◊(select-from-metas 'description here)">
      <meta name="og:description" content="◊(select-from-metas 'description here)">
      <meta name="twitter:description" content="◊(select-from-metas 'description here)">
    }
    <meta name="og:title" content="◊(select-from-metas 'title here) - Shane Logsdon">
    <meta name="twitter:title" content="◊(select-from-metas 'title here)">
    <title>◊(select-from-metas 'title here) - Shane Logsdon</title>
    <link rel="stylesheet" type="text/css" href="/style.css" />
    <link rel="author" type="text/plain" href="/humans.txt" />
  </head>
  <body>
    <div class="wrapper">
      <header>
        <div class="title-subtitle">
          <div class="title">Shane Logsdon</div>
          <div class="subtitle">Polyglot Developer</div>
        </div>
        <nav>
          <a href="/">Top</a>
          <span class="separator"> • </span>
          <a href="/posts/">Posts</a>
          <span class="separator"> • </span>
          <a href="/about/">About</a>
          <span class="separator"> • </span>
          <a href="https://github.com/slogsdon">GitHub</a>
          <span class="separator"> • </span>
          <a href="https://twitter.com/shanelogsdon">Twitter</a>
        </nav>
      </header>
      <main>
        <section class="header">
          ◊when/block[(select-from-metas 'title here)]{
            <h1>◊(select-from-metas 'title here)</h1>
          }
        </section>
        ◊(->html doc)
        ◊when/block[(select-from-metas 'tags here)]{
          <hr>
          <section class="footer">
            Have a comment, correction, etc. to make? <a href="mailto:shane@shanelogsdon.com">Send me an email</a> or make a comment on the <a href="https://github.com/slogsdon/slogsdon.com/issues">source's repository</a>.
          </section>
        }
      </main>
      <footer>
        Copyright © 2012 - 2015 Shane Logsdon
        <span class="separator"> - </span>
        <a href="/about/colophon/">Colophon</a>
      </footer>
    </div>
  </body>
</html>
