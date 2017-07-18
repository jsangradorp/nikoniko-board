'use strict';


var View = require('ampersand-view');


module.exports = View.extend({
    render: function() {
        var dates = this.model.dates;
        this.el = document.createElement('tr');
        this.el.appendChild(document.createElement('td'));
        for (var i in dates) {
            var cell = document.createElement('td');
            cell.innerText = dates[i].format('dd');
            this.el.appendChild(cell);
        }
        return this;
    }
});
