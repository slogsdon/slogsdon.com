<?php

// mysql
define('DB_NAME',     'wordpress');
define('DB_USER',     'root');
define('DB_PASSWORD', '');
define('DB_HOST',     getenv('MYSQL_HOST'));
define('DB_CHARSET',  'utf8');
define('DB_COLLATE',  '');
$table_prefix =       'wp_';

// redis
define('WP_REDIS_HOST', getenv('REDIS_HOST'));

// dev
$env = getenv('WP_ENV');
define('WP_ENV', $env);
define('WP_DEBUG', $env === 'development');

// varnish
define('VHP_VARNISH_IP', getenv('VARNISH_HOST'));

// keys/salts
define('AUTH_KEY',         'E&D6P1Tnw[LusS8G0j~.--Cp7 O.:@~&%;EFB+MECa-J0$W3{9YlFvt4h09<}N2%');
define('SECURE_AUTH_KEY',  'x-4jgriqm(9y^+}g[y.:wc}7Ek`C!!V+%pv/~aQ3?S-AQ_V*?JtX!|w1[;|>e$*i');
define('LOGGED_IN_KEY',    'Oo>p8=F`SL_?4QXeO5@]-|0}XdGUWLNm!t~Rj%gE[CGb@#8W#]Qg^&M$P@FywCN/');
define('NONCE_KEY',        'U%~9,z!WMjp4E>4_a2DxEX#|p_HPdac=EuU6Ihh|y`S.}%dbn-[EXJ 1,G=raV8O');
define('AUTH_SALT',        '~( P&1Ln&#+r.jIbQJXIRHb81:pYPI0DF!?kxKn~S%$iK`zKWHcjj%E<sc=XgU$a');
define('SECURE_AUTH_SALT', 'QvrV3q-JL4lmzKO(j{6z=MJSH]~=D:}^jG{&p}]D{`[aT-/!!4kB&Y=s&-df1v8f');
define('LOGGED_IN_SALT',   '~)E7$l&)5+&)&L/W{#h:@f<;|_#_cDE*[66AOjTXWFjctMVFK~}@V0uUc+{YyqWD');
define('NONCE_SALT',       'kEAm(;n1{DBqLNl0#1L;E[*i|YH/bLC62>kZ`rh&(b5;6TMM97iSz|t9jrXa+twf');

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
    define('ABSPATH', dirname(__FILE__) . '/');


/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
