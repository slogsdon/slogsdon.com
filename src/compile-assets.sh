#!/bin/bash

cd wp/wp-content/themes/simplify
exec npm install
exec bower install
exec gulp --production
