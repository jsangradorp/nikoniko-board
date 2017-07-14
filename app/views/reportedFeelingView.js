'use strict';


var View = require('ampersand-view');
var templates = require('../templates');
var ReportedFeeling = require('../models/reportedFeeling');
var today = require('../today');


module.exports = View.extend({
    initialize: function (options) {
                this.model = new ReportedFeeling(
                        {
                            person_id: 1,
                            board_id: 1,
                            date: today.getTodayString()
                        });
                this.model.fetch();
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
