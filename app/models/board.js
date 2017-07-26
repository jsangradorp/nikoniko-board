'use strict';

var BaseModel = require('./baseModel');
var config = require('clientconfig');
var PeopleModel = require('./people');
var moment = require('moment');
var _ = require('lodash');


module.exports = BaseModel.extend({
    urlRoot: config.apiUrl + '/boards',
    props: {
        id: ['number'],
        label: ['string'],
        from: ['date'],
        until: ['date']
    },
    derived: {
        url: {
            deps: ['id'],
            fn: function() {
                return '/boards' + this.id;
            }
        },
        dates: {
            deps: ['from', 'until'],
            fn: function () {
                var _until = moment(_.get(this, 'until', {})).startOf('day');
                var _from = this.from ? moment(this.from).startOfDay() : _until.clone().subtract(7, 'days');
                var from = moment.min(_until, _from);
                var until = moment.max(until, _from);
                var res = [];
                var cursor = from.clone();
                do {
                    res.push(cursor.clone());
                    cursor.add(1, 'day');

                } while (cursor.isBefore(until));
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
    }
});
