'use strict';

var View = require('ampersand-view');
var templates = require('../templates');
var UserForm = require('../forms/user');

module.exports = View.extend({
    pageTitle: 'Nikoniko Board - User',
    template: templates.pages.userProfile,
    render() {
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
                        alert('Success!');
                        if (data.password && data.password != "") {
                            delete window.localStorage.token;
                            delete window.localStorage.id;
                            window.location = '/login.html';
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
                        self.form.setValues({name: model.name, email: model.email});
                    },
                    error: function(model, response) {
                        console.warning(JSON.stringify(response));
                    }
                });
        this.renderSubview(this.form);
    }
});
