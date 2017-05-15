
let mongoose = require('mongoose');
let config = require('config');
let debug = require('debug')('mongoose.config');

function init () {

    //Check if there is an active mongoose connection

    let db = mongoose.connection;

    if(db){
        db.close(load);
    } else {
        load();
    }

    var load = function(){

        let dbConfig;

        if(process.env.NODE_ENV !== 'test') {
            dbConfig = config.get('dbConfig');
        }
        else {
            dbConfig = config.get('dbConfigTest');
        }

        let URI = 'mongodb://' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.name;

        mongoose.Promise = global.Promise; //to avoid promises warning
        mongoose.connect(URI, (err) => {
            if (err) {
                debug('Connection to ('+ URI +') failed, ' + err);
            } else {
                debug('Connection to ('+ URI +') completed.');
            }
        });

        db = mongoose.connection;
        db.on('error', debug.bind(debug, 'connection error:'));

        var gracefulExit = function() { 
            db.close(function () {
                debug('Mongoose default connection with DB :' + dbConfig.name + ' is disconnected through app termination');
                process.exit(0);
            });
        };

        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);
    };
}

module.exports = init;