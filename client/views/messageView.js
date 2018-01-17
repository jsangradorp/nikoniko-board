
var AmpersandView = require('ampersand-view'),
    Message = require('../models/message');
var templates = require('../templates');

module.exports = AmpersandView.extend({

    template: templates.message,

    // We're binding text and status to the template.
    bindings: {
        'model.text': {
            type: 'innerHTML',
            selector: '.text'
        },
        'model.status': {
            type: 'class',
            selector: '.message-box'
        }
    },

    // We're adding in an event for closing the message-box dialog.
    // PROTIP: Using both touchstart and mousedown guarantees a more
    // native tapping behaviour on mobile devices.
    events: {
        'touchstart .btn-hide': 'hide',
        'mousedown .btn-hide': 'hide',
        'click a': 'preventDefault'
    },

    initialize: function() {
        // We're letting the view instantiate its own model when it is initialized.
        this.model = new Message();
        // If the document already contains a div with class message-box,
        // use this as the parentEl of the view.
        if (document.querySelector('.message-box'))
            this.el = document.querySelector('.message-box');
        else {
            // If .message-box does not exist yet, create a new div.message-box
            // and add it to the DOM.
            var div = document.createElement('div');
            div.classList.add('message-box');
            document.body.appendChild(div);
            // Then make that element the parentEl of the view.
            this.el = document.querySelector('.message-box');
        }
    },

    render: function() {
        this.renderWithTemplate(this);

        // The optional extra content is rendered as a subview.
        if (this.model.content)
            this.renderSubview(this.model.content, document.querySelector('.content'));

        return this;
    },

    show: function(text, status, content) {
        // Only message-box text is obligatory,
        // we should build in some fallbacks if the content
        // or status are not provided.
        if (content) this.model.content = content;
        else this.model.unset('content');

        if (status && typeof status !== 'object') this.model.status = status;
        else if (status) this.model.content = status;

        this.model.text = text;

        // Only render when all props of the model are set.
        this.render();

        this.el.classList.add('show');
        var self = this;
        setTimeout(function(){self.hide.apply(self, null);}, 5000);
    },

    hide: function(e) {
        if (e) {
            this.preventDefault(e);
        }
        this.el.classList.remove('show');
    },

    preventDefault: function(e) {
        e.preventDefault();
    }
});
