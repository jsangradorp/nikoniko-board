var app = require('ampersand-app');
var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var BoardPage = require('./pages/board');
var UserProfilePage = require('./pages/userProfile');
var UserProfileModel = require('./models/userProfile');
var Board = require('./models/board');
var queryString = require('query-string');

module.exports = Router.extend({
    routes: {
        '': 'home',
        'boards/:boardId': 'board',
        'userProfiles/:userId': 'userProfile',
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

    userProfile: function(userId) {
        app.trigger('page', new UserProfilePage({
            model: new UserProfileModel({user_id: parseInt(userId)})
            //model: app.me
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
