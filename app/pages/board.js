'use strict';

var View = require('ampersand-view');
var templates = require('../templates');
var ReportedFeelingView = require('../views/reportedFeelingView');
var BoardRowView = require('../views/boardRowView');
var BoardView = require('../views/boardView');
var BoardModel = require('../models/board');

module.exports = View.extend({
    pageTitle: 'Nikoniko Board',
    template: templates.pages.board,
    initialize: function () {
        this.model = new BoardModel(1);
    },
    bindings: {
        'model.label': {
            'hook': 'board-name'
        }
    },
    subviews: {
        singleReportedFeeling: {
            hook: 'singleReportedFeeling',
            constructor: ReportedFeelingView
        },
        board: {
            hook: 'board-view',
            constructor: BoardView
        }
    }
});
