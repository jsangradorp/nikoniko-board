'use strict';

module.exports = {
    values: [
        'none'
        'ok',
        'good',
        'bad'
    ],
    nextTo: function(value) {
        return this.values[(this.values.indexOf(value) + 1) % this.values.length];
    }
}
