'use strict';

var View = require('ampersand-view');
var templates = require('../templates');
var ReportedFeeling = require('../models/reportedFeeling');

module.exports = View.extend({
    initialize: function (options, model) {
                console.log("Options are: " + options);
                console.log("Passed-in model is: " + model);
                this.model = new ReportedFeeling({board_id: 1, person_id: 1, date: '2017-07-10'});
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
