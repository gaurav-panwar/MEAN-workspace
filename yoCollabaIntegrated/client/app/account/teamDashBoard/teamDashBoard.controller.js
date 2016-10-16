'use strict';
const angular = require('angular');

/*@ngInject*/
export function teamDashBoardController(Auth,$state,$http,socket) {
  this.message = 'Hello';
  this.Auth=Auth;
  this.$state=$state;
  this.$http=$http;
  this.socket=socket;
  this.message = '';
this.teams = [];
this.channels = [];
this.channelId = '';
this.chatHistory = [];
this.id = '';
this.userName = '';
  this.isTeamLead=0;
   this.currentUser=this.Auth.getCurrentUserSync();
if(this.currentUser.role=='teamLead')
this.isTeamLead=1;

alert(this.currentUser.role);

   var self=this;
     self.team = {};
     console.log( this.currentUser);


     this.$http.get('/api/teams/'+this.currentUser.teams[0]._id)
      .success(function(data) {
        console.log("HI I AM INSIDIE AJAX");
        console.log(data);
        self.team=data;
        cns
        //displayTeam(data);
      });

      // function displayTeam(data){
      //   self.team = data;
      //   console.log(self.team);
      //   }







      //Get user Info, Organisations, Teams and channels
          this.Auth.getCurrentUser()
            .then(currentUser => {
              this.id = currentUser._id;
              this.$http.get('/api/users/' + this.id)
                .then(response => {
                  //On response from the api
                  console.log("Response Data: " + JSON.stringify(response.data));
                  //set the userName
                  this.userName = response.data.name;

                  //TODO: change channels according to teams
                  //Get all teams for that user and set in select option
                  this.teams = response.data.teams;
                  //Set the default team name in the select option
                  //this.selectedTeam = this.teams[0].name;


                  for (var i = 0; i < response.data.channels.length; i++) {
                    this.channels.push(response.data.channels[i]);
                  }
                  //set default channel id
                  this.channelId = response.data.channels[0]._id;

                  //Connect to that room for chatting
                  this.socket.room(this.channelId);

                  //Set history in the chatHistory array coming from the api
                  if (response.data.channels[0].history.length != 0) {
                    for (var i = 0; i < response.data.channels[0].history.length; i++) {
                      this.chatHistory.unshift({
                        sender: response.data.channels[0].history[i].user,
                        message: response.data.channels[0].history[i].message
                      });

                    }
                  }
                  console.log("InitMethod channel: " + this.channelId);

                });
              //Updating chat messages when new message is set on the room
              this.socket.syncUpdatesChats(data => {
                this.chatHistory.unshift({
                  sender: data.sender,
                  message: data.message
                });
              });

            });







            // On changing channel, click method
              this.channelClick=function(channel) {
              //Empty the chat history
              this.chatHistory = [];
              //Set new channelId in the current scope
              this.channelId = channel._id;
              //Set new chat room on the server side
              this.socket.room(this.channelId);
              //Hit the api to get chat history for current channel id
              this.$http.get('/api/channels/'+ this.channelId)//+ this.id + "/"
                .then(response => {
                  console.log("channel: " + this.channelId);
                  console.log(response.data);
                  //Set history in the chatHistory array coming from the api
                  if (response.data.history.length != 0) {
                    for (var i = 0; i < response.data.history.length; i++) {
                      this.chatHistory.push({
                        sender: response.data.history[i].user,
                        message: response.data.history[i].message
                      });
                    }
                  }
                });
            }


            this.sendMessage=function() {
              console.log(this.message);
              //If the input field is not empty
              if (this.message) {
                //Emit the socket with senderName, message and channelId
                this.socket.sendMessage({
                  'sender': this.userName,
                  'message': this.message,
                  'room': this.channelId
                });
                //TODO- save the messages on server side
                //Hit api to update chat history in the db
                this.$http.post('/api/users/saveMessage/' + this.channelId, {
                    data: {
                      'user': this.userName,
                      'message': this.message,
                      'type': 'text'
                    }
                  })
                  .then(response => {
                    console.log(response.data);
                  });
                //Empty the input field
                this.message = '';
              }
            }





















































  this.addMember=function(){

alert("in sending mail");

  var postData = {
    email: this.user.email,

    message: 'You have been requested to join '+this.currentUser.teams[0].name+'! '
    +'Please Click on the following link to join 127.0.0.1:3000/signup/'+this.currentUser.teams[0]._id+'/'+this.currentUser.organisation._id+"/"+this.currentUser.organisation.name+"/teamMember"
    };
    console.log(postData);
    this.$http.post('/email', postData)
     .success(function(data) {
       // Show success message
       alert("you have sent a mail to a new member");
       console.log('mail sent successfully');
     })
     .error(function(data) {
       // Show error message
         console.log(' XXX Error: mail not sent! ');
     });

   }
}

export default angular.module('yoCollabaFinalApp.teamDashBoard', [])
  .controller('TeamDashBoardController', teamDashBoardController)
  .name;
