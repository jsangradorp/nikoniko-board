'use strict';

// reportedFeeling Model - reportedFeeling.js
var AmpModel = require('ampersand-model');
var config = require('clientconfig');


module.exports = AmpModel.extend({
    props: {
        id: ['string'],
        feeling: {
            type: 'string',
            values: ['bad', 'neutral', 'good'],
            default: 'neutral'
        }
    },
    url: function() { return config.apiUrl + '/people/' + this.id },
    rotateFeeling: function() {
        if (this.feeling == 'bad') {
            this.feeling = 'neutral';
        }
        else if (this.feeling == 'neutral') {
            this.feeling = 'good';
        }
        else {
            this.feeling = 'bad';
        };
        this.save();
    }
});
