'use strict';

var View = require('ampersand-view');
var templates = require('../templates');
var BoardView = require('../views/boardView');

module.exports = View.extend({
    pageTitle: 'Nikoniko Board',
    template: templates.pages.board,
    bindings: {
        'model.label': {
            'hook': 'board-name'
        }
    },
    subviews: {
        board: {
            hook: 'board-view',
            constructor: BoardView
        }
    }
});
