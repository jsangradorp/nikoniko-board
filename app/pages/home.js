var View = require('ampersand-view');
var templates = require('../templates');
var ReportedFeelingView = require('../views/reportedFeelingView')

module.exports = View.extend({
    pageTitle: 'Nikoniko Board',
    template: templates.pages.home,
    subviews: {
        singleReportedFeeling: {
            hook: 'singleReportedFeeling',
            constructor: ReportedFeelingView
        }
    }
});
