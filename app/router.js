var app = require('ampersand-app');
var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var BoardPage = require('./pages/board');
var Board = require('./models/board');
var queryString = require('query-string');

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

    board: function(boardId, queryStringParams) {
        app.trigger('page', new BoardPage({
            model: new Board({
                boardId: parseInt(boardId),
                from: 'from' in queryStringParams ? queryStringParams.from : undefined,
                until: 'until' in queryStringParams ? queryStringParams.until : undefined
            }, { parse: true })
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
