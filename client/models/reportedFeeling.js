'use strict';


var BaseModel = require('./baseModel');
var config = require('../appconfig');
var feelings = require('../feelings');
var moment = require('moment');
var app = require('ampersand-app');


module.exports = BaseModel.extend({
    props: {
        person_id: ['number'],
        board_id: ['number'],
        date: ['string'],
        feeling: {
            type: 'string',
            values: feelings.values,
            default: feelings.values[0]
        }
    },
    derived: {
        active: {
            deps: ['person_id', 'date'],
            fn: function() {
                return (this.person_id == app.me.person.person_id) && (this.date == moment().format('YYYY-MM-DD'));
            }
        }
    },
    url: function() {
        return config.apiUrl + '/reportedfeelings/boards/' + this.board_id +
            '/people/' + this.person_id + '/dates/' + this.date;
    },
    rotateFeeling: function() {
        this.save(
            {
                board_id: this.board_id,
                person_id: this.person_id,
                date: this.date,
                feeling: feelings.nextTo(this.feeling)
            },
            {
                wait: true,
                error: function() {
                    app.message.show('Error sending value', 'error');
                }
            }
        );
    }
});
