'use strict';


var Model = require('ampersand-model');
var config = require('clientconfig');
var today = require('../today');
var feelings = require('../feelings');


module.exports = Model.extend({
    props: {
        person_id: ['number'],
        board_id: ['number'],
        date: ['date'],
        feeling: {
            type: 'string',
            values: feelings.values,
            default: 'neutral' in feelings.values ? 'neutral' : feelings.values[0]
        }
    },
    url: function() {
        return config.apiUrl + '/reportedfeelings/boards/' + this.board_id +
            '/people/' + this.person_id + '/date/' + today.getTodayString();
    },
    rotateFeeling: function() {
        this.save(
                {
                    board_id: this.board_id,
                    person_id: this.person_id,
                    date: today.getTodayString(),
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
