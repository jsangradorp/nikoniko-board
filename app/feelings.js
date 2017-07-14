'use strict';

module.exports = {
    values: [
        'bad',
        'neutral',
        'good'
    ],
    nextTo: function(value) {
        return this.values[(this.values.indexOf(value) + 1) % this.values.length];
    }
}
