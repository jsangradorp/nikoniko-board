'use strict';

var View = require('ampersand-view');
var templates = require('../templates');
var UserForm = require('../forms/user');
var app = require('ampersand-app');

module.exports = View.extend({
    pageTitle: 'Nikoniko Board - User',
    template: templates.pages.userProfile,
    render: function() {
        var self= this;
        this.renderWithTemplate();
        this.form = new UserForm({
            el: this.queryByHook('user-form'),
            submitCallback: function (data) {
                console.debug(JSON.stringify(data));
                self.model.save(data, {
                    patch: true,
                    wait: true,
                    success: function (data) {
                        console.debug(JSON.stringify(data));
                        alert('User profile updated');
                        if (data.name && data.name != "") {
                            app.me.name = data.name;
                        }
                        if (data.password && data.password != "") {
                            delete window.localStorage.token;
                            delete window.localStorage.id;
                            window.location = 'login.html';
                        }
                    },
                    error: function(model, response, options) {
                        console.error(JSON.stringify(response));
                    }
                });
                return false;
            }
        });
        var self = this;
        this.model.fetch(
                {
                    success: function(model) {
                        self.form.setValues({name: model.name});
                    },
                    error: function(model, response) {
                        console.warn(JSON.stringify(response));
                    }
                });
        this.renderSubview(this.form);
    }
});
