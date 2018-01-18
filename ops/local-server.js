var globalvars = require('./conf/global-vars');
var express = require('express');
var helmet = require('helmet');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var Moonboots = require('moonboots-express');
var morgan = require('morgan');
var compress = require('compression');
var config = require('../client/config');
var serveStatic = require('serve-static');
var stylizer = require('stylizer');
var templatizer = require('templatizer');
var app = express();

// a little helper for fixing paths for various environments
var fixPath = function (pathString) {
    return __dirname + '/../' + pathString; // eslint-disable-line
};


// -----------------
// Configure express
// -----------------
app.use(morgan('combined'));
app.use(compress());
app.use(serveStatic(fixPath('./static-content'), {}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// in order to test this with spacemonkey we need frames
if (!config.isDev) {
    app.use(helmet.xframe());
}
app.use(helmet.xssFilter());
app.use(helmet.nosniff());

app.set('view engine', 'jade');

// ---------------------------------------------------
// Configure Moonboots to serve our client application
// ---------------------------------------------------
new Moonboots({
    moonboots: {
        jsFileName: 'express-app',
        cssFileName: 'express-app',
        main: fixPath('./client/app.js'),
        developmentMode: config.isDev,
        libraries: [
        ],
        stylesheets: [
            fixPath('./stylesheets/app.css')
        ],
        browserify: {
            debug: config.isDev,
            insertGlobalVars: globalvars
        },
        beforeBuildJS: function () {
            // This re-builds our template files from jade each time the app's main
            // js file is requested. Which means you can seamlessly change jade and
            // refresh in your browser to get new templates.
            if (config.isDev) {
                templatizer(fixPath('./templates'),
                    fixPath('./client/templates.js'));
            }
        },
        beforeBuildCSS: function (done) {
            // This re-builds css from stylus each time the app's main
            // css file is requested. Which means you can seamlessly change stylus files
            // and see new styles on refresh.
            if (config.isDev) {
                stylizer({
                    infile: fixPath('./stylesheets/app.styl'),
                    outfile: fixPath('./stylesheets/app.css'),
                    development: true
                }, done);
            } else {
                done();
            }
        }
    },
    server: app
});


// listen for incoming http requests on the port as specified in our config
app.listen(config.http.port);
console.log('Express App is running at: http://' + config.http.listen + ':' + config.http.port + ' Yep. That\'s pretty awesome.'); // eslint-disable-line
