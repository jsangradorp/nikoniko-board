'use strict';

var AmpersandCollection = require('ampersand-collection');
var BoardInListModel = require('./boardInList');

module.exports = AmpersandCollection.extend({
    model: BoardInListModel
});
