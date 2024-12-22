<?php

$articles = json_decode(file_get_contents('resources/data/articles-list.json'));

foreach ($articles as $slug => $post) {
    $year = DateTime::createFromFormat('Y-m-d', $post->date)->format('Y');
    print "[[redirects]]" . PHP_EOL;
    print sprintf('from="/articles/%s/%s"', $post->category, $slug) . PHP_EOL;
    print sprintf('to="/archive/%s/%s"', $year, $slug) . PHP_EOL;
}

$speaking = json_decode(file_get_contents('resources/data/speaking-list.json'));

foreach ($speaking as $slug => $post) {
    $year = DateTime::createFromFormat('Y-m-d', $post->date)->format('Y');
    print "[[redirects]]" . PHP_EOL;
    print sprintf('from="/speaking/%s/%s"', $post->category, $slug) . PHP_EOL;
    print sprintf('to="/archive/%s/%s"', $year, $slug) . PHP_EOL;
}