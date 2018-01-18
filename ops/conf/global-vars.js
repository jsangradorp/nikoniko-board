'use strict';

var defaults = {};

try {
    defaults = require('./default-global-vars');
}
catch(e) {
    console.log('Remember you can have global-vars defaults in ' + // eslint-disable-line
        __dirname + 'default-global-vars.js'); // eslint-disable-line
}

module.exports = {
    API_URL: function() {
        if (typeof process.env.API_URL !== 'undefined') { // eslint-disable-line
            return '\'' + process.env.API_URL + '\''; // eslint-disable-line
        }
        else if (typeof defaults.API_URL !== 'undefined') {
            return '\'' + defaults.API_URL + '\'';
        }
        else {
            throw new Error('You need to specify API_URL as an environment variable or in the default-global-vars.js module file');
        }
    }

};
