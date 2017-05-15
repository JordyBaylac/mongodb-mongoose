
let body_parser = require('body-parser');
let favicon = require('serve-favicon');
let path = require('path');

function init (app) {

    app.use(body_parser.json());

    // The extended option allows to choose between parsing 
    // the URL-encoded data with the querystring library (when false)
    // or the qs library (when true).
    app.use(body_parser.urlencoded({extended: true}));

    app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));

} 

module.exports = init;