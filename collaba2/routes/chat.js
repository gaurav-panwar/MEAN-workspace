//routes file for chats
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UserModel = require('../models/UserModel');
var passport = require('passport');


router.get('/', /*passport.authenticate('jwt', 
	{ session:false, successRedirect:"/chat", failureRedirect:"/users"}),*/ function(req, res, next) {
	res.render('chat');
});


module.exports = router;
