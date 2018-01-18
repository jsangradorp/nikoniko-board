'use strict';

module.exports = {
    API_URL: function() {
                return "'" + (process.env.API_URL || 'MISSING CONFIGURATION') + "'";
    }

}
