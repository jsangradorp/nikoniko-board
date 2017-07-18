'use strict';


var View = require('ampersand-view');
var templates = require('../templates');


module.exports = View.extend({
    template: templates.includes.boardRowView,
    bindings: {
        'model.label': '[data-hook=person-name]'
    }
});
