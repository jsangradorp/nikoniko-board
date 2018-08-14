
var config = {
    'app': {
        'apiUrl': process.env.API_URL || ((typeof API_URL !== 'undefined') && API_URL) || 'missing config', // eslint-disable-line
        'debugMode': false
    }
};

module.exports = config;
