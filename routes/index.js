var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Sample = mongoose.model('Sample');

var isAuthenticated = function (req, res, next) {

	if (req.isAuthenticated()){
		return next();
}
	//might not need it
	res.redirect('/');
}

module.exports = function(passport) {

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	
	// route for facebook authentication and login
	// different scopes while logging in
	router.get('/login/facebook', 
		passport.authenticate('facebook', { scope : 'email' }
	));

	// handle the callback after facebook has authenticated the user
	router.get('/login/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/home',
			failureRedirect : '/'
		})
	);
	
// route for twitter authentication and login
// different scopes while logging in
router.get('/login/twitter',  
  passport.authenticate('twitter')
);
 
// handle the callback after facebook has authenticated the user
router.get('/login/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect : '/twitter',
    failureRedirect : '/'
  })
);
 
/* GET Twitter View Page */
router.get('/twitter', isAuthenticated, function(req, res){
  res.render('twitter', { user: req.user });
});
	
	router.get('/sample', isAuthenticated, function(req, res, next) {
	  Sample.find({}, {_id: 0}, function(err, data){
	  if(err){ return next(err); }
	  	res.json(data);
	  });
	});

	return router;
}


/*router.get('/sample', function(req, res, next) {
  Sample.find(function(err, sample){
    if(err){ return next(err); }
    res.json(sample);
  });
});
*/
