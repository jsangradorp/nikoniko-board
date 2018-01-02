var app = require('ampersand-app');
var _ = require('lodash');
var Router = require('./router');
var MainView = require('./views/main');
var Me = require('./models/me');
var domReady = require('domready');

window.app = app;

app.extend({
  me: new Me({
    user_id: parseInt(window.localStorage.user_id),
    token: window.localStorage.token
  }),
  router: new Router(),
  init: function() {
    if (this.me.token == null) {
      window.location = "login.html?returnTo=" + encodeURIComponent(window.location);
      return;
    }

    this.me.fetch({
      success: _.bind(function(){
        this.mainView = new MainView({
          model: this.me,
          el: document.body
        });
        this.router.history.start({pushState: true});
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
      delete window.localStorage.id;
      window.location = 'login.html';
  }
});

domReady(_.bind(app.init, app));
