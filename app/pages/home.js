var View = require('ampersand-view');
var templates = require('../templates');
var BoardListRowView = require('../views/boardListRowView');

module.exports = View.extend({
    pageTitle: 'Nikoniko Board',
    template: templates.pages.home,
    render: function() {
        var self = this;
        this.renderWithTemplate();
        this.renderCollection(
                self.model.person.boards,
                BoardListRowView,
                this.queryByHook('boards-list'));
    }
});
