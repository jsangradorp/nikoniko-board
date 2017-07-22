'use strict';


var BaseModel = require('./baseModel');
var config = require('clientconfig');
var feelings = require('../feelings');
var moment = require('moment');


module.exports = BaseModel.extend({
    props: {
        person_id: ['number'],
        board_id: ['number'],
        date: ['text'],
        feeling: {
            type: 'string',
            values: feelings.values,
            default: feelings.values[0]
        }
    },
    url: function() {
        return config.apiUrl + '/reportedfeelings/boards/' + this.board_id +
            '/people/' + this.person_id + '/date/' + this.date;
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
                        alert("error sending value");
                    }
                }
        );
    }
});
