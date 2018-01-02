// From http://beletsky.net/2015/01/configuring-front-end-applications.html

var env = process.env.NODE_ENV || 'development';

var config = {
  development: require('./default'),
  production: require('./default'),
  staging: require('./default'),
  default: require('./default')
};

module.exports = config[env];
