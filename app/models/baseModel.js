var Model = require('ampersand-model');
var app = require('ampersand-app');

module.exports = Model.extend({
    ajaxConfig: function(){
        return {
            headers: {
                'Authorization': app.me.token
            }
        };
    }
});
