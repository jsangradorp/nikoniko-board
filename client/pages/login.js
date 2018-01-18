'use strict';

var View = require('ampersand-view');
var templates = require('../templates');
var LoginForm = require('../forms/login');
var app = require('ampersand-app');
var sync = require('ampersand-sync');
var config = require('../config');

module.exports = View.extend({
    pageTitle: 'Nikoniko Board - Login',
    template: templates.pages.login,
    render: function() {
        this.renderWithTemplate();
        this.form = new LoginForm({
            el: this.queryByHook('login-form'),
            submitCallback: function (data) {
                sync('create', null, {
                    url: config.app.apiUrl + '/login',
                    headers: {'Content-Type': 'application/json'},
                    data: JSON.stringify({
                        email: data.email,
                        password: data.password
                    }),
                    success: function(body) {
                        window.localStorage.user_id = body.user;
                        window.localStorage.person = body.person;
                        window.localStorage.token = body.token;
                        app.me.clear();
                        app.me.set({
                            user_id: parseInt(window.localStorage.user_id),
                            token: window.localStorage.token
                        });
                        app.me.fetch({
                            success: function() {
                                app.navigate('');
                            },
                            error: function(){
                                app.logout();
                            }
                        });
                    },
                    error: function(resp, status, message) {
                        if (resp.status !== 0) {
                            app.message.show('Email or password incorrect', 'error');
                        }
                        else {
                            app.message.show('Error accessing API: ' + message, 'error');
                        }
                    }
                });
                return false;
            }
        });
        this.renderSubview(this.form);
    }
});
