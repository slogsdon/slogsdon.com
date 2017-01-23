#!/bin/sh

node _scripts/generate-css.js
node _scripts/generate-critical-css.js
node_modules/.bin/html-minifier -c html-minifier.json --input-dir public --output-dir public --file-ext html && echo "minified HTML"
