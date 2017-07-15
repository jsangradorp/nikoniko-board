'use strict';

var BaseModel = require('./baseModel');
var config = require('clientconfig');


module.exports = BaseModel.extend({
    type: 'user',
    idAttribute: 'user_id',
    urlRoot: config.apiUrl + '/users',
    props: {
        user_id: ['number'],
        name: ['string'],
        email: ['string'],
        person_id: ['number']
    },
    session: {
        token: ['string']
    }
});
