'use strict';

var BaseModel = require('./baseModel');


module.exports = BaseModel.extend({
    props: {
        id: ['number'],
        label: ['string']
    },
    derived: {
        pageurl: {
            deps: [ 'id'  ],
            fn: function() {
                return '/boards/' + this.id;
            }
        }
    }
});
