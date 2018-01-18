var path = require('path');
var stylizer = require('stylizer');
var templatizer = require('templatizer');
var globalvars = require('./local/global-vars');

var fixPath = function (pathString) {
    return path.resolve(path.normalize(pathString));
};

exports.verbose = true;
exports.directory = './build/';
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
        insertGlobalVars: globalvars
    },
    beforeBuildJS: function () {
        templatizer(fixPath('templates'), fixPath('client/templates.js'));
    },
    beforeBuildCSS: function (done) {
        stylizer({
            infile: fixPath('stylesheets/app.styl')
        }, done);
    },
    resourcePrefix: '',
    minify: true,
    developmentMode: false
};
