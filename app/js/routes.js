
module.exports = function(app, passport) {

	var User = require('../models/user');

	//initial landing
	app.get('/', isLoggedIn, function(req, res) {
		console.log(req.user);
		res.render('app', {user : req.user});
	});


	app.get('/login', function(req, res) {
		console.log('got login');
		res.render('index', {user : req.user});
	});

	app.get('/logout', function(req, res){
		console.log('logoout');
	  req.logout();
	  res.redirect('/login');
	});

	// API ROUTES =====================================

	//New Todo
	app.post('/api', function(req, res) {
		console.log('post');
		User.findOneAndUpdate({facebookId: req.body.Fbid},
			{$push: {todos: req.body.todo}},
	    {safe: true, upsert: true},
	    function(err,model) {
	      console.log(err);
				console.log(model);
				res.send(model.todos[model.todos.length-1].id);
	    })
	});

	app.delete('/api', function(req, res) {
		console.log("delete");
		console.log(req.query);
		User.update(
		  { facebookId: req.query.FbId },
		  { $pull: { todos : { _id: req.query.Id } } }
		, function(err, success) {
			if (err)
				console.log(err);
			else {
				console.log("success");
				res.sendStatus(200);
			}
		});
	});

	// FACEBOOK ROUTES ====================================

	app.get('/auth/facebook', passport.authenticate('facebook', {
		scope : ['public_profile', 'email'],
		profileFields : ['id', 'displayName', 'emails','photos', 'picture']
		}));

		// handle the callback after facebook has authenticated the user
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/',
			failureRedirect : '/login'
		})
	);
}

function isLoggedIn(req, res, next) {

		// if user is authenticated in the session, carry on
		if (req.isAuthenticated()) {
			console.log('good auth');
			return next();
		}

		// if they aren't redirect them to the home page
		res.redirect('/login');
}
