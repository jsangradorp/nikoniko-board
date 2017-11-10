'use strict';

var View = require('ampersand-view');
var templates = require('../templates');
var UserForm = require('../forms/me');

module.exports = View.extend({
    pageTitle: 'Nikoniko Board - User',
    template: templates.pages.user,
    initialize: function(spec) {
        this.model.fetch();
    },
    render() {
        this.renderWithTemplate();
        this.form = new UserForm({
            el: this.queryByHook('user-form'),
            model: this.model,
            submitCallback: function (data) {
                console.log(JSON.stringify(data));
                this.model.save(data, {
                    patch: true,
                    wait: true,
                    success: function () {
                        alert('Success!');
                        //app.navigate('/');
                    },
                    error: function(model, response, options) {
                        console.log(JSON.stringify(response));
                    }
                });
                return false;
            }
        });
        this.renderSubview(this.form);
    }
});
