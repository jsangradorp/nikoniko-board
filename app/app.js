var app = require('ampersand-app');
var _ = require('lodash');
var Router = require('./router');
var MainView = require('./views/main');
var LoginView = require('./views/login');
var Me = require('./models/me');
var domReady = require('domready');

window.app = app;

app.extend({
  router: new Router(),
    init: function(optionalPage) {
        this.me = new Me({
            user_id: parseInt(window.localStorage.user_id),
            token: window.localStorage.token
        });
        if (this.me.token == null) {
            this.mainView = new LoginView({
                el: document.body
            });
            return;
        }
        this.me.fetch({
            success: _.bind(function(){
                this.mainView = new MainView({
                    model: this.me,
                    el: document.body
                });
                try {
                    this.router.history.start({pushState: true});
                }
                catch(e) {};
                if (optionalPage) {
                    this.navigate(optionalPage);
                }
            }, this),
            error: _.bind(function(){
                this.logout();
            }, this)
        })
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
      this.init('login');
  }
});

domReady(_.bind(app.init, app));
