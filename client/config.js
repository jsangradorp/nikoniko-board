
var config = {
    'app': {
        'apiUrl': process.env.API_URL || ((typeof API_URL !== 'undefined') && API_URL) || 'missing config',
        'debugMode': false
    }
};

module.exports = config;
