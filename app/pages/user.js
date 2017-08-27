'use strict';

var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
    pageTitle: 'Nikoniko Board - User',
    template: templates.pages.user
});
