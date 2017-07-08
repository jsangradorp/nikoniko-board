'use strict';

var View = require('ampersand-view');
var templates = require('../templates');
var ReportedFeeling = require('../models/reportedFeeling');

module.exports = View.extend({
    initialize: function (options) {
                console.log("The options are:", options);
                this.model = new ReportedFeeling();
    },
    template: templates.includes.reportedFeeling,
    bindings: {
        'model.feeling': {
            type: 'class',
            hook: 'feeling'
        }
    },
    events: {
        'click': 'handleClick'
    },
    handleClick: function(e){
        this.model.rotateFeeling();
        return false;
    }
});
