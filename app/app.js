var app = require('ampersand-app');
var _ = require('lodash');
var Router = require('./router');
var MainView = require('./views/main');
var Me = require('./models/me');
var domReady = require('domready');
var bind = require('amp-bind');

//window.app = app;

app.extend({
  me: new Me({
    id: parseInt(window.localStorage.id),
    token: window.localStorage.token
  }),
  router: new Router(),
  init: function() {
    if (this.me.token == null) {
      window.location = "/login.html";
      return;
    }

    this.me.fetch({
      success: bind(function(){
        this.mainView = new MainView({
          model: this.me,
          el: document.body
        });
        this.router.history.start({pushState: true});
      }, this),
      error: bind(function(){
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
    window.location = '/login.html';
  }
});

domReady(_.bind(app.init, app));
