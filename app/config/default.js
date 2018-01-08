var config = {
    "isDev": true,
    "isSecure": false,
    "session": {
        "host": "localhost",
        "port": 6379,
        "db": 1,
        "secret": "bang!",
        "secure": false
    },
    "http": {
        "listen": "0.0.0.0",
        "port": 9080
    },
    "app": {
        "apiUrl": "https://api.nikonikoboards.com",
        "debugMode": false
    }
};

module.exports = config;
