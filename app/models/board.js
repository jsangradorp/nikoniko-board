'use strict';

var BaseModel = require('./baseModel');
var config = require('clientconfig');
var PeopleModel = require('./people');


module.exports = BaseModel.extend({
    type: 'user',
    urlRoot: config.apiUrl + '/boards',
    props: {
        id: ['number'],
        label: ['string']
    },
    collections: {
        people: PeopleModel
    },
    initialize: function (boardId) {
        this.id = boardId;
        this.fetch();
        //debugger;
    }
});
