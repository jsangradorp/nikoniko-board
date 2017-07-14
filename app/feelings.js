'use strict';

module.exports = {
    values: [
        'bad',
        'neutral',
        'good'
    ],
    nextTo: function(value) {
        return values[values.indexOf(value) + 1) % values.length]
    }
}
