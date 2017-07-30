var View = require('ampersand-view');
var templates = require('../templates');
var BoardListRowView = require('../views/boardListRowView');

module.exports = View.extend({
    pageTitle: 'Nikoniko Board',
    template: templates.pages.home,
    bindings: {
        'model.name': {
            hook: 'user-name'
        }
    },
    render: function() {
        this.renderWithTemplate();
        this.renderCollection(
                this.model.boards,
                BoardListRowView,
                this.queryByHook('boards-list'));
    }
});
