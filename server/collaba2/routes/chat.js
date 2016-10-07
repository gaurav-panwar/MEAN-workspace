//routes file for chats
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UserModel = require('../models/UserModel');
var passport = require('passport');


router.post('/', passport.authenticate('jwt', { session:false}), function(req, res, next) {
	res.send('Authenticated');
});


module.exports = router;
