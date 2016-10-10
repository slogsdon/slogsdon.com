'use strict';

const critical = require('critical');

critical.generate({
    base: '_site/',
    src: 'index.html',
    css: ['assets/css/main.css'],
    dest: '_includes/main.critical.css',
    dimensions: [{
        height: 200,
        width: 500
    }, {
        height: 900,
        width: 1200
    }]
});
