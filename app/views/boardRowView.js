'use strict';


var View = require('ampersand-view');
var templates = require('../templates');
var ReportedFeelingView = require('./reportedFeelingView');
var ReportedFeelingModel = require('../models/reportedFeeling')
var moment = require('moment');
var app = require('ampersand-app');
var _ = require('lodash');

module.exports = View.extend({
    template: templates.includes.boardRowView,
    bindings: {
        'model.label': '[data-hook=person-name]'
    },
    render: function(options) {
        this.renderWithTemplate();
        var dates = this.parent.parent.model.dates;
        var self = this;
        _.each(dates, function(date) {
            var model = new ReportedFeelingModel({
                person_id: self.model.id,
                board_id: 1,
                date: date.format('YYYY-MM-DD')
            });
            model.fetch();
            var el = document.createElement('td');
            if([6, 7].includes(date.isoWeekday())) {
                el.classList.add('weekend');
            }
            self.el.appendChild(el);
            self.renderSubview(new ReportedFeelingView({
                model: model
            }), el);
        });
    }
});
