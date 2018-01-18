'use strict';

var BaseModel = require('./baseModel');
var config = require('../config');


module.exports = BaseModel.extend({
    urlRoot: config.app.apiUrl + '/people',
    props: {
        person_id: ['number'],
        label: ['string'],
        feelingsByDate: ['object']
    }
});
