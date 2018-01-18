'use strict';

var BaseModel = require('./baseModel');
var config = require('../config');
var PersonModel = require('./person');
var BoardsModel = require('./boards');


module.exports = BaseModel.extend({
    idAttribute: 'user_id',
    urlRoot: config.app.apiUrl + '/users',
    props: {
        user_id: ['number'],
        name: ['string'],
        email: ['string']
    },
    derived: {
        editurl: {
            deps: ['user_id'],
            fn: function() {
                return '/userProfiles/' + this.user_id;
            }
        }
    },
    children: {
        person: PersonModel
    },
    collections: {
        boards: BoardsModel
    },
    session: {
        token: ['string']
    }
});
