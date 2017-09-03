var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');


module.exports = FormView.extend({
    fields: function () {
        return [
            new InputView({
                label: 'Name',
                name: 'name',
                value: this.model && this.model.name,
                required: false,
                placeholder: 'Name'
            }),
            new InputView({
                label: 'Email',
                name: 'email',
                value: this.model && this.model.email,
                required: false,
                placeholder: 'Email'
            }),
            new InputView({
                label: 'Password',
                name: 'password',
                type: 'password',
                value: '',
                required: false,
                placeholder: 'Password'
            }),
            new InputView({
                name: 'submit',
                value: 'Submit',
                type: 'submit'
            })
        ];
    }
});
