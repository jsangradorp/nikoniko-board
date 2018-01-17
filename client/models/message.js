var Model = require('ampersand-state');

module.exports = Model.extend({
    props: {
        text: ['string', true, ''],
        status: ['string', true, 'success'],
        // Content should be of type Object,
        // since we'll be dumping an ampersand-view into it.
        content: ['object', false, null]
    }
});
