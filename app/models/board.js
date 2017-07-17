'use strict';

var BaseModel = require('./baseModel');
var config = require('clientconfig');
var PeopleModel = require('./people');


module.exports = BaseModel.extend({
    type: 'user',
    urlRoot: config.apiUrl + '/boards',
    props: {
        id: ['number'],
        label: ['string'],
        from: ['date'],
        until: ['date']
    },
    derived: {
        dates: {
            deps: ['from', 'until'],
            fn: function () {
                var self = this;
                var res = [];
                if (!self.until) {
                    self.until = today();
                }
                if (!self.from) {
                    self.from = self.until - 7 days;
                }
                var i = self.from;
                while (i < self.until) {
                    res.push(i);
                    i += 1 day;
                }
                return res;
            }
        }
    },
    collections: {
        people: PeopleModel
    },
    initialize: function (boardId) {
        this.id = boardId;
        this.fetch();
        //debugger;
    }
});
