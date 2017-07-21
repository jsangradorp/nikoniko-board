'use strict';


var View = require('ampersand-view');
var templates = require('../templates');
var ReportedFeelingView = require('./reportedFeelingView');
var ReportedFeelingModel = require('../models/reportedFeeling')
var moment = require('moment');
var app = require('ampersand-app');

module.exports = View.extend({
    template: templates.includes.boardRowView,
    bindings: {
        'model.label': '[data-hook=person-name]'
    },
    render: function(options) {
        this.renderWithTemplate();
        var model = new ReportedFeelingModel({
            person_id: this.model.id,
            board_id: 1,
            date: moment().format('YYYY-MM-DD')
        });
        model.fetch();
        for (var i = 0 ; i < 8; i++) {
            var el = document.createElement('td');
            this.el.appendChild(el);
            this.renderSubview(new ReportedFeelingView({
                model: model
            }), el);
        }
    }
});
