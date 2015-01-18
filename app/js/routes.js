
module.exports = function(passport, FacebookStrategy, app) {

	var mongoose = require('mongoose');
	var findOrCreate = require('mongoose-findorcreate');

	mongoose.connect("mongodb://dandaman17:Mmpdrw123@ds031671.mongolab.com:31671/gottado");
	console.log("gooddb");
	var Schema = mongoose.Schema;

	var todoSchema = new Schema({
	  facebookId:  String,
	  pic: String,
	  name: String,
	  todos: [{
	  	name: String,
	  	dueDate: String	
	  }]
	});

	todoSchema.plugin(findOrCreate);

	var User = mongoose.model('User',todoSchema);

	app.use(passport.initialize());

	passport.serializeUser(function(user, done) {
	  done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
	  done(null, obj);
	});

	var valid = false;

	passport.use(new FacebookStrategy({
	      authType: 'reauthenticate',
		    clientID: 576135949186286,
		    clientSecret: "8a64a0fa23ef2c44b6c7803fc5ebee28",
		    callbackURL: "/auth/facebook/callback",
		    enableProof: false,
		    profileFields: ['id', 'displayName', 'link', 'photos', 'email']
		},
	    function(accessToken, refreshToken, profile, done) {
	        //check user table for anyone with a facebook ID of profile.id
	        User.findOne({
	            facebookId: profile.id 
	        }, function(err, user) {
	            if (err) {
	                return done(err);
	            }
	            //No user was found... so create a new user with values from Facebook (all the profile. stuff)
	            if (!user) {
	            	console.log("new user")
	                user = new User({
	                	  facebookId : profile.id,
	                    name: profile.displayName,
	                    pic: profile.photos[0].value,
	                    todos:[]
	                });
	                user.save(function(err) {
	                    if (err) console.log(err);
	                    currentUser = user;
	                    return done(err, user);
	                });
	            } else {
	                console.log("found user")
	                console.log(user);
	                currentUser = user;
	                return done(err, user);
	            }
	        });
	    }
	));

	app.get('/', function(req, res, next) {
		if(valid) {
			console.log("WERE GOOD");
			res.render('app', {user : currentUser});
			//console.log(currentUser);
		}
		else
			next();
	}, passport.authenticate('facebook', {display:'touch'}));

	app.get('/auth/facebook/callback',
	 passport.authenticate('facebook', { failureRedirect: '/login'}),
	  function(req, res) {
	    // Successful authentication, redirect home.
	    console.log("fb Callback");
	    valid = true;
	    res.redirect('/');
	  });

	app.get('/login', function(req, res) {
	    res.render('index');
	});

	app.get('/logout', function(req, res){
		valid = false;
	  req.logout();
	  res.redirect('/login');
	});

	//New Todo
	app.post('/api', function(req, res) {
		User.findOneAndUpdate({facebookId: req.body.fbid},
			{$push: {todos: req.body.todo}},
	    {safe: true, upsert: true},
	    function(err,model) {
	      console.log("hey");
	      currentUser.todos.push(req.body.todo);
	    })

	  res.end('it worked');
	});

	app.get('/api', function(req, res) {
	  console.log(req.body.id);
	})

}