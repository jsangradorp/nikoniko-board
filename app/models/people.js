'use strict';

var AmpersandCollection = require('ampersand-collection');
var PersonModel = require('./person');

module.exports = AmpersandCollection.extend({
    model: PersonModel
});
