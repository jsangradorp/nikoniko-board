'use strict';


var View = require('ampersand-view');
var templates = require('../templates');
var BoardRowView = require('./boardRowView');
var BoardHeaderView = require('./boardHeaderView');


module.exports = View.extend({
    template: templates.includes.boardView,
    render: function () {
        this.renderWithTemplate();
        this.renderSubview(
                new BoardHeaderView({
                    model: this.parent.model
                }),
                this.queryByHook('board-header'));
        this.renderCollection(
                this.parent.model.people,
                BoardRowView,
                this.queryByHook('board-rows'));
    }
});
