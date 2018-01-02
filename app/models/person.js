'use strict';

var BaseModel = require('./baseModel');
var config = require('../appconfig');


module.exports = BaseModel.extend({
    urlRoot: config.apiUrl + '/people',
    props: {
        person_id: ['number'],
        label: ['string'],
        feelingsByDate: ['object']
    }
});
