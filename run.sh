#!/usr/bin/env sh

# LOCAL="y" ./run.sh

kill_children() {
        echo
            [ -n "$proxypid"  ] && kill -9 $proxypid 2> /dev/null

}
trap "kill_children" 0

if [ "$LOCAL" = "y" -o "$LOCAL" = "1" -o "$LOCAL" = "t" ] ; then
    local-ssl-proxy --source 9443 --target 9080 --cert localhost.crt --key localhost.key & proxypid=$!
fi

export GETCONFIG_ROOT="$(pwd)/app/config"
node --no-warnings server.js
