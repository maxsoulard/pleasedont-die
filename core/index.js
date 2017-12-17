const Server = require('./src/server.js');
const nconf = require('nconf');

nconf.argv();
const server = new Server(nconf.get('mongodb:host'), nconf.get('mongodb:db'));
server.connect()
    .then(() => server.start());