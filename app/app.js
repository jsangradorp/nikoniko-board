var app = require('ampersand-app');
var _ = require('lodash');
var Router = require('./router');
var MainView = require('./views/main');
var Me = require('./models/me');
var domReady = require('domready');
var MessageView = require('./views/messageView');

window.app = app;

app.extend({
    router: new Router(),
    init: function() {
        this.me = new Me({
            user_id: parseInt(window.localStorage.user_id),
            token: window.localStorage.token
        });
        this.mainView = new MainView({
            model: this.me,
            el: document.body
        });
        this.message = new MessageView();
        this.router.history.start({pushState: true});

        if (this.me.token == null && this.needsAuthentication(window.location)) {
            this.me.fetch({
                error: _.bind(function(){
                    this.logout();
                }, this)
            });
        }
    },
    needsAuthentication: function(url) {
        return !/^(login|forgotpassword)/.test(url);
    },
    navigate: function(page) {
        var url = (page.charAt(0) === '/') ? page.slice(1) : page;
        this.router.history.navigate(url, {
            trigger: true
        });
    },
    logout: function(){
        delete window.localStorage.token;
        delete window.localStorage.user_id;
        delete window.localStorage.person;
        this.me.clear();
        this.navigate('login');
    },
    message: null
});

domReady(_.bind(app.init, app));
