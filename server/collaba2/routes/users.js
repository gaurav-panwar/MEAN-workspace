var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UserModel = require('../models/UserModel');
var app = require('../app.js');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var cfg = require('../authentic/config.js');



/* GET users Logged In. */
router.get('/', function(req, res, next) {
  res.render('login');
});


//POST the Login details of User.
router.post('/', function(req, res, next) {
	console.log('Login Route');
	UserModel.findOne({userName:req.body.userName, password:req.body.password}, function(err, user) {
		if(err) console.error(err);
		console.log(user);
		if(user) {
			console.log(user.userName + ' Successfully logged in.');
			var payload = {userName:req.body.userName};
			var token = jwt.sign(payload, cfg.jwtSecret);
			//res.json({token:"JWT " + token});//For passport Validation
			res.redirect('/chat?userName=' + user.userName);
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
	UserModel.findOne({userName: req.body.userName}, function(err, existUser) {
		if(err) console.error(err);
		console.log(existUser);
		if(existUser) {
			res.send("User already exists.");
		}
		else {
			var newUser = new UserModel({
				userName: req.body.userName,
				password: req.body.password,
				name: req.body.name,
				phone: req.body.phone
			});

			newUser.save(function(err, data) {
				if(err) console.error(err);
				console.log("User '" + newUser.userName + "' Successfully registered.");
			});
			res.redirect('login');
		}
	});
});


module.exports = router;
