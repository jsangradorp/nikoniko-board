var View = require('ampersand-view');
var templates = require('../templates');
var BoardListRowView = require('../views/boardListRowView');

module.exports = View.extend({
    pageTitle: 'Nikoniko Board',
    template: templates.pages.home,
    render: function() {
        this.renderWithTemplate();
        this.renderCollection(
                this.parent.model.people,
                BoardListRowView,
                this.queryByHook('boards-list'));
    }
});
