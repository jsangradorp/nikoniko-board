'use strict';

// reportedFeeling Model - reportedFeeling.js
var AmpModel = require('ampersand-model');
var config = require('clientconfig');


module.exports = AmpModel.extend({
    props: {
        personid: ['number'],
        boardid: ['number'],
        date: [''],
        feeling: {
            type: 'string',
            values: ['bad', 'neutral', 'good'],
            default: 'neutral'
        }
    },
    url: function() { return config.apiUrl + '/reportedfeeling/' + this.personid },
    rotateFeeling: function() {
        var newFeeling;
        if (this.feeling == 'bad') {
            newFeeling = 'neutral';
        }
        else if (this.feeling == 'neutral') {
            newFeeling = 'good';
        }
        else {
            newFeeling = 'bad';
        };
        this.save({board_id: 1, person_id: 1, date: '2017-07-10', feeling: newFeeling}, {wait: true});
    }
});
