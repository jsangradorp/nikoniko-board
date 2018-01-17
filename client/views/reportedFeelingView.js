'use strict';


var View = require('ampersand-view');
var templates = require('../templates');


module.exports = View.extend({
    template: templates.includes.reportedFeeling,
    bindings: {
        'model.feeling': {
            type: 'class',
            hook: 'feeling'
        },
        'model.active': {
            type: 'booleanClass',
            hook: 'feeling'
        }
    },
    events: {
        'click div.active': 'handleClick'
    },
    handleClick: function(){
        this.model.rotateFeeling();
        return false;
    }
});
