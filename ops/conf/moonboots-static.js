var envify = require('envify/custom');
var path = require('path');
var stylizer = require('stylizer');
var templatizer = require('templatizer');

var fixPath = function (pathString) {
    return path.resolve(path.normalize(pathString));
};

exports.verbose = true;
exports.directory = './output/';
exports.public = './static-content/';
exports.moonboots = {
    main: './client/app.js',
    stylesheets: [
        './stylesheets/app.css'
    ],
    jsFileName: 'nikoniko-boards',
    cssFileName: 'nikoniko-boards',
    browserify: {
        debug: false,
        transform: [envify({ NODE_ENV: 'default' })]
    },
    beforeBuildJS: function () {
        templatizer(fixPath('templates'), fixPath('client/templates.js'));
    },
    beforeBuildCSS: function (done) {
        stylizer({
            infile: fixPath('stylesheets/app.styl'),
            outfile: fixPath('stylesheets/app.css'),
        });
    },
    resourcePrefix: '',
    minify: true,
    developmentMode: false
};
