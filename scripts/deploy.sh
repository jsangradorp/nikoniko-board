#!/usr/bin/env bash

# set -x

DEST="$@"
[ -z "$DEST" ] && DEST="localhost"

cd $(dirname $0)/..

API_URL="https://api.nikonikoboards.com" ./node_modules/.bin/moonboots ./conf/moonboots-static.js

if ! which -s cdist ; then
    echo No cdist available - installing in a virtualenv
    virtualenv .cdist-venv
    . .cdist-venv/bin/activate
    pip install cdist
fi

cdist config -c conf/cdist -v $DEST
