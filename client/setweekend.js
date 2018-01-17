'use strict';

module.exports = {
    setWeekendOrNot: function(el, date) {
        el.classList.toggle('weekend', [6,7].includes(date.isoWeekday()));
    }
};
