#!/bin/bash

if [ "$(which raco)" == "" ]
then
    echo 'Racket (specifically `raco`) does not seem to be installed.'
    exit 1
fi

pushd _src/
racket -tm ../make-tags.rkt
raco pollen render index.ptree
pushd posts/
raco pollen render index.ptree
popd
pushd tags/
raco pollen render index.ptree
popd
popd
raco pollen publish _src _build
