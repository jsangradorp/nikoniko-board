'use strict';

module.exports = {
    getTodayString: function() {
        return new Date().toISOString().slice(0,10);
    }
}
