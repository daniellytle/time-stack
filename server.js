
var express = require('express');
var app     = express();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var bodyParser = require('body-parser')

app.use( bodyParser() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var port = process.env.PORT || 8080;

console.log("listening on 8080");

//PASSPORT OAUTH

require('./app/js/routes')(passport,FacebookStrategy,app);

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/app/client');
app.set('view engine', 'jade');

app.listen(port);

// DUuu



