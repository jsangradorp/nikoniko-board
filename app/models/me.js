'use strict';

var BaseModel = require('./baseModel');
var config = require('clientconfig');
var PersonModel = require('./person');
var BoardsModel = require('./boards');


module.exports = BaseModel.extend({
    idAttribute: 'user_id',
    urlRoot: config.apiUrl + '/users',
    props: {
        user_id: ['number'],
        name: ['string'],
        email: ['string']
    },
    derived: {
        deps: ['user_id'],
        editurl: {
            fn: function() {
                return "/users/" + this.user_id;
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
