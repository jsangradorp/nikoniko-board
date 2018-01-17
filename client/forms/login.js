var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');


module.exports = FormView.extend({
    fields: function () {
        return [
            new InputView({
                label: 'Email',
                name: 'email',
                value: '',
                required: true,
                placeholder: 'Email'
            }),
            new InputView({
                label: 'Password',
                name: 'password',
                type: 'password',
                value: '',
                required: true,
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
