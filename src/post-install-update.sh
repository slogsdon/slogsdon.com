#!/bin/bash

# WP Config
if [ ! -f wp/wp-config.php ]; then
  ln -s ../src/wp-config.php wp/
fi

echo
echo "** Be sure to compile your assets **"
echo
echo "    bash src/compile-assets.sh"
echo
