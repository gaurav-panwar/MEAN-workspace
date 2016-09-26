var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var io = require('socket.io');
var UserModel = require('../models/UserModel');

router.use(bodyParser());

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render("register");
});


router.get('/register', function(req, res, next) {
	res.render('register');
});


router.post('/register', function(req, res, next) {
  var userName = req.body.userName;
  var userPass = req.body.userPass;
  var confirmPass = req.body.confirmPass;
  console.log("register");
  /*var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;*/

  if(confirmPass != userPass) {
  	//res.send('The passwords do not Match');
  	//res.redirect('/users/register');
  }


  UserModel.findOne({uName:userName}, function(err, user) {
  	if(err) {
  		console.log("error");
  		res.send(err);
  	}
  	else {
  		console.log(user);
  		console.log("done");

  		if(user ) {
  			console.log('User Already exists.');
  			res.redirect("/users/register");
  		}
  		else {
  		var newUser = new UserModel({"uName": userName, "password": confirmPass/*, "name":name, "email": email, "phone": phone*/});
  		newUser.save(function(err, user) {
  		if(err) console.log(err);
  		console.log("Registration Successful. " + newUser);
  		res.redirect('/users/login');
  	});
  	//console.log("Registration Successful. " + newUser);
  	}
  }
  });

});

router.get('/login', function (req, res, next) {
  res.render('login');
});


router.post('/login', function(req, res, next) {
	console.log('login module');
	var userName = req.body.userName;
	var userPass = req.body.userPass;

	UserModel.find({uName:userName, password:userPass}, function(err, user) {
		if(err) {
			console.error(err);
			res.send('Invalid User Credentials');
		}
		else {
			console.log('User Found. ' + userName + ' Successfully Logged in.');
			//res.send(userName + ' Successfully logged in.');
			res.redirect('users/chat');
		}
	});
});


router.post('/chats', function() {

});


module.exports = router;
