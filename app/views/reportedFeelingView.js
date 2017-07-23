'use strict';


var View = require('ampersand-view');
var templates = require('../templates');
var ReportedFeeling = require('../models/reportedFeeling');
var app = require('ampersand-app');


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
    handleClick: function(e){
        this.model.rotateFeeling();
        return false;
    }
});
