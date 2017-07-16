'use strict';

var Collection = require('ampersand-collection');
var PersonModel = require('./person');

module.exports = Collection.extend({
    model: PersonModel
});
