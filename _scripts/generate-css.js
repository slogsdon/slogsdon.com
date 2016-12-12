'use strict';

const fs = require('fs');
const tachyonsBuildCss = require('tachyons-build-css');

const input = fs.readFileSync('themes/plain/source/assets/css/_input.css', 'utf8');

tachyonsBuildCss(input, {
  from: 'themes/plain/source/assets/css/_input.css',
  to: 'themes/plain/source/assets/css/main.css',
  minify: true
}).then(result => {
  fs.writeFileSync('themes/plain/source/assets/css/main.css', result.css);
});

console.log('main.css generated.')
