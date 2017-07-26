'use strict';

var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
    template: templates.includes.boardListRowView,
    bindings: {
        'model.name': {
            'type': 'text',
            'hook': 'board-list-row'
        },
        'model.url': {
            'type': 'attribute',
            'name': 'href',
            'hook': 'board-list-row'
        }
    }
});
