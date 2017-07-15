'use strict';

var BaseModel = require('./baseModel');
var config = require('clientconfig');
var PersonModel = require('./person');


module.exports = BaseModel.extend({
    type: 'user',
    idAttribute: 'user_id',
    urlRoot: config.apiUrl + '/users',
    props: {
        user_id: ['number'],
        name: ['string'],
        email: ['string']
    },
    children: {
        person: PersonModel
    },
    session: {
        token: ['string']
    }
});
