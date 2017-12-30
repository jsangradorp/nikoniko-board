exports.moonboots = {
    jsFileName: "express-app",
        cssFileName: "express-app",
        main: "./app/app.js",
        developmentMode: true,
        libraries: [
        ],
        stylesheets: [
            "stylesheets/app.css"
        ],
        browserify: {
            debug: true
        }
};
exports.verbose = true;
exports.directory = "output";
exports.public = "static/";
