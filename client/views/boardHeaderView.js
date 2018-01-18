'use strict';


var View = require('ampersand-view');
var setweekend = require('../includes/setweekend');
var _ = require('lodash');


module.exports = View.extend({
    render: function() {
        var dates = this.model.dates;
        this.el = document.createElement('tr');
        this.el.appendChild(document.createElement('td'));
        var self = this;
        _.each(dates.reverse(), function(date) {
            var cell = document.createElement('td');
            cell.innerText = date.format('dd D');
            setweekend.setWeekendOrNot(cell, date);
            self.el.appendChild(cell);
        });
        return this;
    }
});
