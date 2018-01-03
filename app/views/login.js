// This basically a copy of main.js, removing some stuff

var setFavicon = require('favicon-setter');
var View = require('ampersand-view');
var LoginForm = require('../forms/login');
var domify = require('domify');
var templates = require('../templates');
var sync = require('ampersand-sync');
var config = require('../appconfig');
var app = require('ampersand-app');

module.exports = View.extend({
    template: templates.login,
    autoRender: true,
    render: function () {
        // some additional stuff we want to add to the document head
        document.head.appendChild(domify(templates.head()));

        // main renderer
        this.renderWithTemplate(this);
        this.form = new LoginForm({
            el: this.queryByHook('login-form'),
            submitCallback: function (data) {
                var rawRequest = sync('create', null, {
                    url: config.apiUrl + '/login',
                    headers: {"Content-Type": "application/json"},
                    data: JSON.stringify({
                        email: data.email,
                        password: data.password
                    }),
                    success: function(body, status, responseObject) {
                        window.localStorage.user_id = body.user;
                        window.localStorage.person = body.person;
                        window.localStorage.token = body.token;
                        app.init('/');
                    },
                    error: function(responseObject, status, message) {
                        alert('Invalid login request');
                        console.log(responseObject);
                        console.log('Error: ' + message);
                    }
                });
                return false;
            }
        });
        this.renderSubview(this.form);

        // setting a favicon for fun (note, it's dynamic)
        setFavicon('/favicon.ico');
        return this;
    }
});
