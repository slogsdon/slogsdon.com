'use strict';

const fs = require('fs');
const tachyonsBuildCss = require('tachyons-build-css');

const input = fs.readFileSync('assets/css/_input.css', 'utf8');

tachyonsBuildCss(input, {
  from: 'assets/css/_input.css',
  to: 'assets/css/main.css',
  minify: true
}).then(result => {
  fs.writeFileSync('assets/css/main.css', result.css);
});

console.log('assets/css/main.css generated.')
