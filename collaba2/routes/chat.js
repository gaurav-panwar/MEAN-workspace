//routes file for chats
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UserModel = require('../models/UserModel');


router.get('/', function(req, res, next) {
	res.render('chat');
});


module.exports = router;
