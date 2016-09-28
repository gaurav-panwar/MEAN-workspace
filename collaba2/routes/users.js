var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UserModel = require('../models/UserModel');


/* GET users Logged In. */
router.get('/', function(req, res, next) {
  res.render('login');
});


//POST the Login details of User.
router.post('/', function(req, res, next) {
	console.log('Login Route');
	UserModel.findOne({email:req.body.email, password:req.body.password}, function(err, user) {
		if(err) console.error(err);
		console.log(user);
		if(user) {
			console.log(user.email + ' Successfully logged in.');
			res.redirect('/chat?userName=' + user.email);
		}
		else {
			res.send('Invalid User Credentials.');
		}
	});
});


//GET the User Registration Form
router.get('/register', function(req, res, next) {
	res.render('register');
});

//POST the User Registration details.
router.post('/register', function(req, res, next) {
	console.log('POST register');
	UserModel.findOne({email: req.body.email}, function(err, existUser) {
		if(err) console.error(err);
		console.log(existUser);
		if(existUser) {
			res.send("User already exists.");
		}
		else {
			var newUser = new UserModel({
				email: req.body.email,
				password: req.body.password,
				name: req.body.name,
				phone: req.body.phone
			});

			newUser.save(function(err, data) {
				if(err) console.error(err);
				console.log("User '" + newUser.email + "' Successfully registered.");
			});
			res.redirect('/chat?userName='+ newUser.email);
		}
	});
});


module.exports = router;
