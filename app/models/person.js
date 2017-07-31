'use strict';

var BaseModel = require('./baseModel');
var config = require('clientconfig');


module.exports = BaseModel.extend({
    urlRoot: config.apiUrl + '/people',
    props: {
        id: ['number'],
        label: ['string'],
        feelingsByDate: ['object']
    }
});
