#!/usr/bin/env bash

# ./scripts/run.sh

topdir=$(cd $(dirname $0)/.. && pwd)
CERT="${topdir}/conf/local/localhost.crt"
KEY="${topdir}/conf/local/localhost.key"

kill_children() {
        echo
            [ -n "$proxypid"  ] && kill -9 $proxypid 2> /dev/null

}
trap "kill_children" 0

ensure_proxy() {
    if [ ! -x "${topdir}/node_modules/.bin/local-ssl-proxy" ]; then
        (cd ${topdir} && npm install local-ssl-proxy)
    fi
}

ensure_certificates() {
    if [ ! -r "${CERT}" -o ! -r "${KEY}" ]; then
        mkdir -p $(dirname "${CERT}")
        mkdir -p $(dirname "${KEY}")
        openssl req -x509 -newkey rsa:4096 -sha256 -nodes -keyout ${KEY} -out ${CERT} -subj "/CN=example.com" -days 3650
    fi
}

fire_proxy() {
    ensure_proxy
    ensure_certificates
    "${topdir}/node_modules/.bin/local-ssl-proxy" --source 9443 --target 9080 --cert "${topdir}/conf/local/localhost.crt" --key "${topdir}/conf/local/localhost.key" & proxypid=$!
}

fire_proxy
node --no-warnings "${topdir}/server.js"
