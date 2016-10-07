var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.post('/', function(req, res, next) {
	var testData = req.body.testData;
	console.log('Data Received at Server : ' + testData);
	res.send('Response from Server');
});

module.exports = router; 

