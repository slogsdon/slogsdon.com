#!/bin/sh

# tag archive pages
rm -rf tags/*
bundle exec ruby _scripts/generate-tag-archive.rb
node _scripts/generate-css.js
node _scripts/generate-critical-css.js
node _scripts/generate-projects-data.js
