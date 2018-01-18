'use strict';

var BaseModel = require('./baseModel');
var config = require('../config');


module.exports = BaseModel.extend({
    idAttribute: 'user_id',
    urlRoot: config.app.apiUrl + '/userProfiles',
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
