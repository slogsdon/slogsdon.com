'use strict';

const critical = require('critical');

critical.generate({
    base: 'public/',
    src: 'index.html',
    css: ['themes/plain/source/assets/css/main.css'],
    dest: 'themes/plain/source/layout/_partial/_main.critical.css',
    dimensions: [{
        height: 200,
        width: 500
    }, {
        height: 900,
        width: 1200
    }]
});

console.log('_main.critical.css generated.');