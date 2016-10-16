var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var UserModel = require('./UserModel');

router.post('/submit', function(req, res) {
	var name = req.body.name;
	console.log('Server route : ' + name);
	var user = new UserModel();
	user.name = name;

	user.save(function(err, data) {
		console.log(data);
		if(err) {
			res.send(err);
		}
		else {
			res.json({message: "You have been successfully registered."});
		}
	});
});


module.exports = router;