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

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render("login");
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


router.post('/login', function(req, res, next) {
  console.log('Login Module');
  var userName = req.body.userName;
  var userPass = req.body.userPass;

  UserModel.findOne({"userName":userName, "password":userPass}, function(err, user) {
    if(err) console.error(err);
      //console.log(user);
      if(user) {
        //console.log("User '" + user + "' Found.");
        user.online = true;
        UserModel.find({"online":true}, function(err, users) {
          if(err) console.error(err);
          var userList = [];
          console.log('Online Users : ' + users);
          for(i=0; i<users.length; ++i) { 
            userList.push(users[i].userName);
          }
          console.log(userList);
          //io.emit('Online-users', userList);
          res.redirect('/users/chats?userName=' + userName);
        });
      }
      res.send("User doesn't exist.");
  });
  
});


router.get('/chats', function(req, res, next) {
  var userName = req.query.userName;
  res.render('chatWindow', {"userName":userName});
});


router.post('/chats', function(req, res, next) {

});


module.exports = router;
