'use strict';

var BaseModel = require('./baseModel');
var config = require('../appconfig');


module.exports = BaseModel.extend({
    idAttribute: 'user_id',
    urlRoot: config.apiUrl + '/userProfiles',
    props: {
        user_id: ['number'],
        name: ['string'],
        password: ['string']
    },
    derived: {
        deps: ['user_id'],
        editurl: {
            fn: function() {
                return '/users/' + this.user_id;
            }
        }
    }
});
