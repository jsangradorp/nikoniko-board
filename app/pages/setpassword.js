'use strict';

var View = require('ampersand-view');
var templates = require('../templates');
var SetPasswordForm = require('../forms/setpassword');
var app = require('ampersand-app');
var config = require('../appconfig');
var sync = require('ampersand-sync');

module.exports = View.extend({
    pageTitle: 'Nikoniko Board - Set password',
    template: templates.pages.setpassword,
    render: function() {
        this.renderWithTemplate();
        this.form = new SetPasswordForm({
            el: this.queryByHook('setpassword-form'),
            submitCallback: function (data) {
                sync('create', null, {
                    url: config.apiUrl + '/passwordReset/' + data.password_reset_code.toString(),
                    headers: {'Content-Type': 'application/json'},
                    data: JSON.stringify({
                        password: data.password
                    }),
                    success: function() {
                        alert('Password successfully set');
                        app.me.clear();
                        app.navigate('login');
                    },
                    error: function() {
                        alert('Invalid password set request');
                    }
                });
                return false;
            }
        });
        this.renderSubview(this.form);
    }
});
