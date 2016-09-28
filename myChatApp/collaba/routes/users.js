var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
// var io = require('socket.io');
var UserModel = require('../models/UserModel');
//Get server instance from www
var server = require('../bin/www');
//create socket
var io = require('socket.io')(server);


router.use(bodyParser());

/* GET the Login Page */
router.get('/', function(req, res, next) {
	res.render("login");
});

//Get User Logged in.
router.post('/login', function(req, res, next) {
  console.log('Login Module');
  var userName = req.body.userName;
  var userPass = req.body.userPass;

  UserModel.findOne({"userName":userName, "password":userPass}, function(err, user) {
    if(err) console.error(err);
      console.log(user);
      if(user) {
        console.log("User '" + user + "' Found.");

          res.redirect('/users/chats?userName=' + userName);
          res.end();
        }
      });
      res.send("User doesn't exist.");
      //res.end();
});


router.get('/chats', function(req, res, next) {
  var userName = req.query.userName;
  res.render('chatWindow', {"userName":userName});
});

//Get the register page
router.get('/register', function(req, res, next) {
	res.render('register');
});

//Submit register data
router.post('/register', function(req, res, next) {
  var userName = req.body.userName;
  var userPass = req.body.userPass;
  var confirmPass = req.body.confirmPass;
  console.log("register");
  /*var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;*/

  if(confirmPass != userPass) {
    res.send('The passwords do not Match');
  	//res.redirect('/users/register');
  }


  UserModel.findOne({"userName":userName}, function(err, user) {
  	if(err) {
  		console.log("error");
  		res.send(err);
  	}
  	else {
  		/*console.log(user);
  		console.log("done");*/

  		if(user) {
  			console.log('User Already exists.');
  			res.redirect("/users/register");
  		}
  		else {
  		  var newUser = new UserModel({"userName": userName, "password": confirmPass/*, "name":name, "email": email, "phone": phone*/});
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





router.post('/chats', function(req, res, next) {

});


module.exports = router;
