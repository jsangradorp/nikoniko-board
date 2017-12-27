'use strict';

var BaseModel = require('./baseModel');
var config = require('clientconfig');

module.exports = BaseModel.extend({
    props: {
        board_id: ['number'],
        label: ['string']
    },
    derived: {
        pageurl: {
            deps: [ 'board_id'  ],
            fn: function() {
                return '/boards/' + this.board_id;
            }
        }
    }
});
