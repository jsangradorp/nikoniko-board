#!/usr/bin/env bash

# ./ops/run-local-server.sh

topdir=$(cd $(dirname $0)/.. && pwd)
confdir="${topdir}/ops/conf/local"
CERT="${confdir}/localhost.crt"
KEY="${confdir}/localhost.key"

kill_children() {
    echo
    [ -n "$proxypid"  ] && kill -9 $proxypid 2> /dev/null
}
trap "kill_children" 0

main() {
    install_packages
    fire_proxy
    node --no-warnings "${topdir}/ops/local-server.js"
}

install_packages() {
    (cd ${topdir} && npm install)
}

fire_proxy() {
    ensure_certificates
    "${topdir}/node_modules/.bin/local-ssl-proxy" --source 9443 --target 9080 --cert "${CERT}" --key "${KEY}" & proxypid=$!
}

ensure_certificates() {
    if [ ! -r "${CERT}" -o ! -r "${KEY}" ]; then
        mkdir -p $(dirname "${CERT}")
        mkdir -p $(dirname "${KEY}")
        openssl req -x509 -newkey rsa:4096 -sha256 -nodes -keyout ${KEY} -out ${CERT} -subj "/CN=example.com" -days 3650
    fi
}

main
