'use strict';

var View = require('ampersand-view');
var templates = require('../templates');
var ReportedFeeling = require('../models/reportedFeeling');

module.exports = View.extend({
    initialize: function (options) {
                console.log("The options are:", options);
                this.model = new ReportedFeeling({personid: 1, boardid: 1, date: new Date().toISOString().slice(0,10)});
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
