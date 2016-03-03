#!/bin/sh

# tag archive pages
rm -rf tags/*
bundle exec ruby _scripts/generate-tag-archive.rb
