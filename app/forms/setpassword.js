var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');


module.exports = FormView.extend({
    fields: function () {
        return [
            new InputView({
                label: 'Code',
                name: 'password_reset_code',
                value: '',
                required: true,
                placeholder: 'Code'
            }),
            new InputView({
                label: 'Password',
                name: 'password',
                value: '',
                required: true,
                type: 'password',
                placeholder: 'New password'
            }),
            new InputView({
                name: 'submit',
                value: 'Submit',
                type: 'submit'
            })
        ];
    }
});
