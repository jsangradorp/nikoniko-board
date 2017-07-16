'use strict';

var BaseModel = require('./baseModel');
var config = require('clientconfig');


module.exports = BaseModel.extend({
    type: 'user',
    urlRoot: config.apiUrl + '/boards',
    initialize: function (boardId) {
        this.id = boardId;
        this.fetch();
    },
    props: {
        id: ['number'],
        label: ['string']
    }
});
