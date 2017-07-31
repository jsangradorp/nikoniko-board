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
        from: ['string'],
        until: ['string']
    },
    derived: {
        dates: {
            deps: ['from', 'until'],
            fn: function () {
                var res = [];
                var cursor = moment(this.from);
                var until = moment(this.until);
                while (cursor.isSameOrBefore(until)) {
                    res.push(cursor.clone());
                    cursor.add(1, 'day');
                };
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
        var _until = moment(attrs.until).startOf('day');
        var _from = (attrs.from && attrs.from > '') ? moment(attrs.from).startOf('day') : _until.clone().subtract(7, 'days');
        attrs.from = moment.min(_until, _from).format('YYYY-MM-DD');
        attrs.until = moment.max(_until, _from).format('YYYY-MM-DD');
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
