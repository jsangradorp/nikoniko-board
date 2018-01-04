'use strict';

var View = require('ampersand-view');
var templates = require('../templates');
var ForgotPasswordForm = require('../forms/forgotpassword');
var app = require('ampersand-app');
var config = require('../appconfig');
var sync = require('ampersand-sync');

module.exports = View.extend({
    pageTitle: 'Nikoniko Board - Forgot password',
    template: templates.pages.forgotpassword,
    render: function() {
        this.renderWithTemplate();
        this.form = new ForgotPasswordForm({
            el: this.queryByHook('forgotpassword-form'),
            submitCallback: function (data) {
                var rawRequest = sync('create', null, {
                    url: config.apiUrl + '/passwordResetCode',
                    headers: {"Content-Type": "application/json"},
                    data: JSON.stringify({
                        email: data.email
                    }),
                    success: function(body, status, responseObject) {
                        app.navigate('');
                    },
                    error: function(responseObject, status, message) {
                        alert('Invalid password reset request');
                        console.log(responseObject);
                        console.log('Error: ' + message);
                    }
                });
                return false;
            }
        });
        this.renderSubview(this.form);
    }
});
