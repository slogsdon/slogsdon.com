// # Ghost Configuration
// Setup your Ghost install for various environments
// Documentation can be found at http://support.ghost.org/config/

var path = require('path'),
    config,
    db_url = process.env.DATABASE_URL || '',
    pass_host,
    port_name,
    db = {};

db_url = db_url.split('://')[1];
pass_host = db_url.split(':')[1];
port_name = db_url.split(':')[2];

db.user = db_url.split(':')[0];
db.pass = pass_host.split('@')[0];
db.host = pass_host.split('@')[1];
db.port = port_name.split('/')[0];
db.name = port_name.split('/')[1];

delete db_url;
delete pass_host;
delete port_name;

config = {
    // ### Production
    // When running Ghost in the wild, use the production environment
    // Configure your URL and mail settings here
    production: {
        url: 'http://www.slogsdon.com',
        mail: {},
        database: {
            client: 'pg',
            connection: {
                host: db.host,
                user: db.user,
                password: db.pass,
                database: db.name,
                port: db.port
            },
            debug: false
        },

        mail: {
            from: 'Shane Logsdon <shane@shanelogsdon.com>',
            transport: 'SMTP',
            options: {
                host: 'smtp.mandrillapp.com',
                port: 587,
                auth: {
                    user: 'shane@logsdon.io',
                    pass: 'nnM9FGAJ5BkJ9cMvCN7wTQ'
                }
            }
        },

        server: {
            host: '0.0.0.0',
            port: process.env.PORT
        }
    },

    // ### Development **(default)**
    development: {
        // The url to use when providing links to the site, E.g. in RSS and email.
        // Change this to your Ghost blogs published URL.
        url: 'http://localhost:4000',

        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-dev.db')
            },
            debug: false
        },

        mail: {
            from: 'Shane Logsdon <shane@shanelogsdon.com>',
            transport: 'SMTP',
            options: {
                host: 'smtp.mandrillapp.com',
                port: 587,
                auth: {
                    user: 'shane@logsdon.io',
                    pass: 'nnM9FGAJ5BkJ9cMvCN7wTQ'
                }
            }
        },

        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '127.0.0.1',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: '4000'
        },

        paths: {
            contentPath: path.join(__dirname, '/content/')
        }
    },

    // **Developers only need to edit below here**

    // ### Testing
    // Used when developing Ghost to run tests and check the health of Ghost
    // Uses a different port number
    testing: {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-test.db')
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    },

    // ### Testing MySQL
    // Used by Travis - Automated testing run through GitHub
    'testing-mysql': {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'mysql',
            connection: {
                host     : '127.0.0.1',
                user     : 'root',
                password : '',
                database : 'ghost_testing',
                charset  : 'utf8'
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    },

    // ### Testing pg
    // Used by Travis - Automated testing run through GitHub
    'testing-pg': {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'pg',
            connection: {
                host     : '127.0.0.1',
                user     : 'postgres',
                password : '',
                database : 'ghost_testing',
                charset  : 'utf8'
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    }
};

// Export config
module.exports = config;
