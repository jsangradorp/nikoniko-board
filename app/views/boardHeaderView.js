'use strict';


var View = require('ampersand-view');
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
            if([6, 7].includes(date.isoWeekday())) {
                cell.classList.add('weekend');
            }
            self.el.appendChild(cell);
        });
        return this;
    }
});
