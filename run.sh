#!/usr/bin/env sh

# LOCAL="y" ./run.sh

kill_children() {
        echo
            [ -n "$proxypid"  ] && kill -9 $proxypid 2> /dev/null

}
trap "kill_children" 0

if [ "$LOCAL" = "y" -o "$LOCAL" = "1" -o "$LOCAL" = "t" ] ; then
    [ -z "$API_URL" ] && API_URL="https://127.0.0.1:8443"
    SELF_PORT="9080"
    local-ssl-proxy --source 9443 --target $SELF_PORT --cert localhost.crt --key localhost.key & proxypid=$!
fi

export API_URL
export SELF_PORT
node --no-warnings server.js
