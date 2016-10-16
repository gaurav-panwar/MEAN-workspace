'use strict';
const angular = require('angular');
const ngFileUpload = require('ng-file-upload');

/*@ngInject*/
export function teamDashBoardController(Auth,$state,$http,socket,Upload,$timeout) {
  this.message = 'Hello';
  this.Auth=Auth;
  this.$state=$state;
  this.$http=$http;
  this.socket=socket;
  this.Upload = Upload;
  this.$timeout = $timeout;
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
  this.showFileStatus=false;
  this.percent=0;
  this.teamsChannel = [];
  var self = this;


  alert(this.currentUser.role);

  var self=this;
  self.team = {};
  console.log( this.currentUser);


  this.$http.get('/api/teams/'+this.currentUser.teams[0]._id)
  .success(function(data) {
    console.log("HI I AM INSIDIE AJAX");
    console.log(data);
    self.team=data;
    self.teamsChannel.push(self.team);
    //displayTeam(data);
  });
  console.log(this.teamsChannel);
        console.log(self.teamsChannel);
  // function displayTeam(data){
  //   self.team = data;
  //   console.log(self.team);
  //   }







  //Get user Info, Organisations, Teams and channels
  this.Auth.getCurrentUser()
  .then(currentUser => {
    this.id = currentUser._id;
    console.log('id:'+this.id);
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
      self.channelId = response.data.channels[0]._id;

      //Connect to that room for chatting
      this.socket.room(this.channelId);

      //Set history in the chatHistory array coming from the api
      if (response.data.channels[0].history.length != 0) {
        for (var i = 0; i < response.data.channels[0].history.length; i++) {
          var extension = response.data.channels[0].history[i].message.split('.');
          if(extension.length>1)
          {
            //if the chat element is file it's href needs to be from client folder
            var messageUrl = response.data.channels[0].history[i].message.split('/');
            messageUrl.splice(0,1);
            messageUrl= messageUrl.join("/");
            self.chatHistory.unshift({
              sender: response.data.channels[0].history[i].user,
              message: messageUrl,
              type: response.data.channels[0].history[i].messageType,
              ext:extension[extension.length-1]
            });
          }
          else {
            //text chats
            self.chatHistory.unshift({
              sender: response.data.channels[0].history[i].user,
              message: response.data.channels[0].history[i].message,
              type: response.data.channels[0].history[i].messageType,
              ext:extension[extension.length-1]
            });
          }
        }
      }

      console.log("InitMethod channel: " + this.channelId);

    });
    //Updating chat messages when new message is set on the room
  this.socket.syncUpdatesChats(data => {
    var extension = data.message.split('.');
    if(extension.length>1)
    {
      //if the chat element is file it's href needs to be from client folder
      var messageUrl = data.message.split('/');
      messageUrl.splice(0,1);
      messageUrl= messageUrl.join("/");
      self.chatHistory.unshift({
        sender: data.sender,
        message: messageUrl,
        type: data.type,
        ext:extension[extension.length-1]
      });
    }
    else {
      //text chats
      self.chatHistory.unshift({
        sender: data.sender,
        message: data.message,
        type: data.type,
        ext:extension[extension.length-1]
      });
    }
  });

  });

  // On changing channel, click method
    this.channelClick=function(channel) {
      //Empty the chat history
      self.chatHistory = [];
      //Set new channelId in the current scope
      self.channelId = channel._id;
      //Set new chat room on the server side
      self.socket.room(this.channelId);
      //Hit the api to get chat history for current channel id
      self.$http.get('/api/channels/'+ this.channelId)//+ this.id + "/"
      .then(response => {
        console.log("channel: " + this.channelId);
        console.log(response.data);
        //Set history in the chatHistory array coming from the api
        if (response.data.history.length != 0) {
          for (var i = 0; i < response.data.history.length; i++) {
            var extension = response.data.history[i].message.split('.');
            if(extension.length>1)
            {
              //if the chat element is file it's href needs to be from client folder
              var messageUrl = response.data.history[i].message.split('/');
              messageUrl.splice(0,1);
              messageUrl= messageUrl.join("/");
              self.chatHistory.unshift({
                sender: response.data.history[i].user,
                message: messageUrl,
                type: response.data.history[i].messageType,
                ext:extension[extension.length-1]
              });
            }
            else {
              //text chats
              self.chatHistory.unshift({
                sender: response.data.history[i].user,
                message: response.data.history[i].message,
                type: response.data.history[i].messageType,
                ext:extension[extension.length-1]
              });
            }
          }
         this.sendChatHistory(self.chatHistory);
        }
      });
    }
     this.sendChatHistory=function(chatHistory){
    console.log(chatHistory);
    self.chatHistory=chatHistory;
    console.log(self.chatHistory);
  }

//   this.openLink = function(url) {
//     var ext = url.split('/');
//     ext=ext[ext.length-1];
//     var file = fs.createWriteStream("file."+ext);
//       var config = {
//           headers:  {
//               'Authorization': Auth.getToken(),
//           }
//       };
//       console.log('In open link');
//       $http.get(url, config,function(response) {
//   response.pipe(file);
// });
//   }

  this.sendMessage=function() {
    console.log(this.message);
    //If the input field is not empty
    if (this.message) {
      //Emit the socket with senderName, message and channelId
      this.socket.sendMessage({
        'sender': this.userName,
        'message': this.message,
        'type':'text',
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
  this.upload = function (file, errFiles) {
      console.log('upload file initiated');
      this.f = file;
      this.errFile = errFiles && errFiles[0];
      if (file) {
        file.upload = this.Upload.upload({
          'user': this.userName,
          'type': 'file',
          url: 'api/users/uploads',
          file: file
        });

        file.upload.then(response => {
          this.$timeout(() => {
            this.showFileStatus=false;
            this.percent=0;
            file.result = response.data;
            console.log(response.data);

              //Emit the socket with senderName, fileName and channelId
              this.socket.sendMessage({
                'sender': this.userName,
                'message': response.data.filePath,
                'type':'file',
                'room': this.channelId
              });
              //Hit api to update chat history in the db
              console.log('before sending file message');
              this.$http.post('/api/users/saveMessage/' + this.channelId, {
                data: {
                  'user': this.userName,
                  'message': response.data.filePath,
                  'type': 'file'
                }
              })
              .then(response => {
                console.log(response.data);
              });

          });
        }, response => {
          if (response.status > 0)
            console.log(response.status + ": " + response.data);
        }, evt => {
          this.showFileStatus=true;
          this.percent = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
      }

    };



    this.addChannel=function(){

      alert(this.channelName);
      this.$http.post('/api/channels/',{name:this.channelName})
      .success(function(data){
        console.log(data);
        console.log(self.currentUser.teams[0].members.length);
        var a={members:self.currentUser.teams[0].members};
        console.log(a);
        console.log(data._id);
        self.Auth.addMembersInChannel({channelId:data._id,members:self.currentUser.teams[0].members,teamId:self.currentUser.teams[0]._id});

        self.Auth.addChannelInTeam({channelId:data._id,teamId:self.currentUser.teams[0]._id});

        for(var i=0;i<self.currentUser.teams[0].members.length;i++)
        {
          self.Auth.addChannelInUser({userId:self.currentUser.teams[0].members[i],channelId:data._id});

        }
      });

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
