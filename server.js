
var express     = require('express');
var app         = express();
var passport    = require('passport');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var port        = process.env.PORT || 8080;
var configDB    = require('./config/database.js');
var session     = require('express-session');
var cookieP     = require('cookie-parser');

// DB setup
mongoose.connect(configDB.url);


  app.use(cookieP('dothething'));
  // Express Session
  app.use(session({ secret : 'dothething' })); // session secret
  app.use(passport.initialize());
  app.use(passport.session());


  require('./config/passport')(passport);
  require('./app/js/routes.js')(app, passport);

  // Initial setup
  app.use(bodyParser());       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));

  // Expose static assets
  app.use(express.static(__dirname + '/public'));
  app.set('views', __dirname + '/app/client');
  app.set('view engine', 'jade');





app.listen(port);
console.log('listening on port ' + port);
// Let the games begin
