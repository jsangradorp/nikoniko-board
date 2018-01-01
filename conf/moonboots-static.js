exports.verbose = true;
exports.directory = "./output/";
exports.public = "./static/";
exports.moonboots = {
    main: "./app/app.js",
    libraries: [],
    stylesheets: [
        "./stylesheets/app.css"
    ],
    jsFileName: "nikoniko-boards",
    cssFileName: "nikoniko-boards",
    browserify: {
        debug: false
    },
    resourcePrefix: "",
    minify: true,
    developmentMode: false
};
