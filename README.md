Development of this software has been moved to https://gitlab.com/jsangradorp/nikoniko-board

# Nikoniko board

A web frontend for the
[Nikoniko API](https://github.com/jsangradorp/nikonikoapi), using the
[Ampersand.js](https://ampersandjs.com/) framework.  It is a single page app
running 100%  on the browser.

For information about what a Nikoniko board is and my motivation to develop
one, see the aforementioned
[Nikoniko API](https://github.com/jsangradorp/nikonikoapi).

## How to run it

1. download/install [node.js](https://nodejs.org/) and
   [openssl](https://www.openssl.org/).
2. install dependencies: `npm install`.
3. fire up a [Nikoniko API](https://github.com/jsangradorp/nikonikoapi), for
   example by cloning its repo and running `JWT_SECRET_KEY='mysecret'
   docker-compose up` from inside it. Of course you need
   [docker](https://www.docker.com/) and
   [docker-compose](https://docs.docker.com/compose/) installed.
4. run it: `./ops/run-local-server.sh`; that will use the API at
   [https://127.0.0.1:8443](https://127.0.0.1:8443). Alternatively you can use
   any other API installation by running
   `API_URL='https://api.example.com' ./ops/run-local-server.sh`
5. open [the Nikoniko Board](https://127.0.0.1:9443/) in a web browser.

## How to build and serve statically

I use the [moonboots-static](https://github.com/lukekarrys/moonboots-static)
utility for building the app.

1. have [node.js](https://nodejs.org/) installed.
2. install dependencies: `npm install`.
3. run `./node_modules/.bin/moonboots ./ops/conf/build/moonboots-static.js`
4. copy the files created in the `/build/` directory to your http server of
   choice.

## License

NikonikoAPI is released under the GPL3 license. See the [LICENSE](./LICENSE)
file for more details.
