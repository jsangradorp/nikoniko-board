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
    initialize: function (attrs) {
        this.id = attrs.boardId;
        this.fetch();
    },
    parse: function(attrs) {
        if (attrs.people) {
            for (var i = 0, l = attrs.people.length; i < l; ++i) {
                attrs.people[i].feelingsByDate = {};
                var person = attrs.people[i];
                if (person.reportedfeelings) {
                    for (var j = 0, ll = person.reportedfeelings.length; j < ll; ++j) {
                        var feeling = person.reportedfeelings[j];
                        attrs.people[i].feelingsByDate[feeling.date] = feeling.feeling;
                    }
                }
                delete attrs.people[i].reportedfeelings;
            }
        }
        return attrs;
    }
});
