'use strict';


var View = require('ampersand-view');
var templates = require('../templates');
var ReportedFeeling = require('../models/reportedFeeling');
var today = require('../today');
var app = require('ampersand-app');


module.exports = View.extend({
    template: templates.includes.boardRowView,
    bindings: {
        'model.label': {
            'hook': 'person-name'
        }
    }
});
