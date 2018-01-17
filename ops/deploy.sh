#!/usr/bin/env bash

topdir=$(cd $(dirname $0)/.. && pwd)
DEST="$@"

main() {
    install_packages
    build
    deploy
}

install_packages() {
    (cd ${topdir} && npm install)
}

build() {
    "${topdir}/node_modules/.bin/moonboots" "$(dirname $0)/conf/moonboots-static.js" # Won't work if calling as absolute path
}

deploy() {
    ensure_cdist
    [ -z "$DEST" ] && DEST="localhost"
    cdist config -c "${topdir}/ops/conf/cdist" -v $DEST
}

ensure_cdist() {
    if ! which -s cdist ; then
        echo No cdist available - installing in a virtualenv
        [ ! -d "${topdir}/.cdist-venv" ] && virtualenv "${topdir}/.cdist-venv"
        . "${topdir}/.cdist-venv/bin/activate"
        ! which -s cdist && pip install cdist
    fi
}

main
