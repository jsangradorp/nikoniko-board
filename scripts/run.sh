#!/usr/bin/env sh

# LOCAL="y" ./scripts/run.sh

topdir=$(cd $(dirname $0)/.. && pwd)

kill_children() {
        echo
            [ -n "$proxypid"  ] && kill -9 $proxypid 2> /dev/null

}
trap "kill_children" 0

if [ "$LOCAL" = "y" -o "$LOCAL" = "1" -o "$LOCAL" = "t" ] ; then
    if [ ! -x "${topdir}/node_modules/.bin/local-ssl-proxy" ]; then
        (cd ${topdir} && npm install local-ssl-proxy)
    fi

    "${topdir}/node_modules/.bin/local-ssl-proxy" --source 9443 --target 9080 --cert "${topdir}/conf/local/localhost.crt" --key "${topdir}/conf/local/localhost.key" & proxypid=$!
fi

export GETCONFIG_ROOT="$(pwd)/app/config"
node --no-warnings server.js
