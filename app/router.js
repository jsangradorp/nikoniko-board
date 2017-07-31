var app = require('ampersand-app');
var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var BoardPage = require('./pages/board');
var Board = require('./models/board');

module.exports = Router.extend({
    routes: {
        '': 'home',
        'boards/:boardId': 'board',
        '(*path)': 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    home: function () {
        app.trigger('page', new HomePage({
            model: app.me
        }));
    },

    board: function(boardId) {
        app.trigger('page', new BoardPage({
            model: new Board({ boardId: parseInt(boardId) }, { parse: true })
        }));
    },

    catchAll: function () {
        this.redirectTo('');
    }
});
