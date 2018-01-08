'use strict';


var View = require('ampersand-view');
var templates = require('../templates');
var ReportedFeelingView = require('./reportedFeelingView');
var ReportedFeelingModel = require('../models/reportedFeeling');
var setweekend = require('../setweekend');
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
            var dateString = date.format('YYYY-MM-DD');
            var model = new ReportedFeelingModel({
                person_id: self.model.person_id,
                board_id: self.parent.parent.model.id,
                date: dateString,
                feeling: dateString in self.model.feelingsByDate ? self.model.feelingsByDate[dateString] : 'none'
            });
            var el = document.createElement('td');
            setweekend.setWeekendOrNot(el, date);
            self.renderSubview(new ReportedFeelingView({
                model: model
            }), el);
            self.el.appendChild(el);
        });
    }
});
