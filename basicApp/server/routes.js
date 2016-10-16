var express = require('express');
var router = express.Router();
var Users = require('./users');



//Should be done by Front end Client side routes
/*router.get('/', function(req, res, next) {

});*/

router.post('/',function(req, res) {
		var user = new Users();
		user.name= req.body.name;
		user.save(function(err){
			if(err){
				res.send(err);
			} else {
				res.json({
					message : 'You have been registered'
				});
			}
		});
	})
module.exports = router;
