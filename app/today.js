'use strict';

module.exports = {
    getTodayString: function() {
        var todayLocal = new Date();
        todayLocal.setUTCMinutes(todayLocal.getUTCMinutes() - todayLocal.getTimezoneOffset());
        return todayLocal.toISOString().slice(0,10);
    }
}
