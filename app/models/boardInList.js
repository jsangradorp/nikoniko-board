'use strict';

var BaseModel = require('./baseModel');

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
