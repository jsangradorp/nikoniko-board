exports.register = function (plugin, options, next) {        
    // Tell Hapi to handle the static folder as a file directory
    plugin.route({ 
        method: 'GET',
        path: '/images/{param*}',
        handler: {directory: {path: 'static/images/'}}
    });

    // We expect those files to be availiable from the root of our web app
    plugin.route({
        method: 'GET',
        path: '/robots.txt',
        handler: {file: {path: 'static/robots.txt'}}
    });

    plugin.route({
        method: 'GET',
        path: '/favicon.ico',
        handler: {file: {path: 'static/favicon.ico'}}
    });

    next();
};

exports.register.attributes = {
    version: '0.0.0',
    name: 'static_routes'
};
