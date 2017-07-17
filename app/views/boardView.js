'use strict';


var View = require('ampersand-view');
var templates = require('../templates');
var BoardRowView = require('./boardRowView');


module.exports = View.extend({
    template: templates.includes.boardView,
    render: function () {
        this.renderWithTemplate();
        this.renderCollection(
                this.model.people,
                BoardRowView,
                this.queryByHook('board-rows'));
    }
});
