


/// MONGOOSE SETUP

require('./config/mongoose.config')();


/// EXPRESS SETUP 

let express = require('express');
let config = require('config');
let debug = require('debug')('server');

let app = express();

require('./config/express.config')(app);

require('./config/routers.config.js')(app);

let port;

if(process.env.NODE_ENV !== 'test') {
    debug('production environmet');
    port = config.get('serverConfig').port;
}
else {
    debug('test environmet');
    port = config.get('serverConfigTest').port;
}

app.listen(port, () => {
    debug('Listening on port: ' + port);
});

module.exports = app;
