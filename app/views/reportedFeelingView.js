'use strict';


var View = require('ampersand-view');
var templates = require('../templates');
var ReportedFeeling = require('../models/reportedFeeling');
var app = require('ampersand-app');
var moment = require('moment');


module.exports = View.extend({
    initialize: function (options) {
                this.model = new ReportedFeeling(
                        {
                            person_id: app.me.person.id,
                            board_id: 1,
                            date: moment().format('YYYY-MM-DD')
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
