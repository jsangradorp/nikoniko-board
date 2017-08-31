var app = require('ampersand-app');
var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var BoardPage = require('./pages/board');
var UserPage = require('./pages/user');
var Board = require('./models/board');
var queryString = require('query-string');

module.exports = Router.extend({
    routes: {
        '': 'home',
        'boards/:boardId': 'board',
        'users/:userId': 'user',
        '(*path)': 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    home: function () {
        app.trigger('page', new HomePage({
            model: app.me
        }));
    },

    board: function(boardId, queryStringParams) {
        app.trigger('page', new BoardPage({
            model: new Board({
                boardId: parseInt(boardId),
                from: 'from' in queryStringParams ? queryStringParams.from : undefined,
                until: 'until' in queryStringParams ? queryStringParams.until : undefined
            }, { parse: true })
        }));
    },

    user: function(userId, queryStringParams) {
        app.trigger('page', new UserPage({
            model: new Me({user_id: userId})
        }));
    },

    catchAll: function () {
        this.redirectTo('');
    },

    execute: function(callback, args) {
        if (args.length > 1) {
            args.push(queryString.parse(args.pop()));
        }
        if (callback) callback.apply(this, args);

    }

});
