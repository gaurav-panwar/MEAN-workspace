'use strict';
const angular = require('angular');

/*@ngInject*/
export function organisationDashBoardController(Auth,$state,$http,$cookies) {
  var self = this;
  self.org = {};
this.Auth = Auth;
this.$state = $state;
this.$http = $http;
  this.setFormCheck = function(){
        this.showForm = true;
  }


  this.$http.post('/api/organisations/findOrgbyName', {name:$cookies.get('organisation')})
   .success(function(data) {
     console.log(data);
     addOrg(data);
   })
   .error(function(data) {
     // Show error message
       console.log(' Error ');
   });


  function addOrg(data){
    console.log(data);
    self.org = data;
    console.log(self.org);
  }







  this.addTeam = function(){
    console.log("here");
    var self = this;
    this.showForm = false;

    this.Auth.addTeam(this.team)
        .then((data) =>{
            this.Auth.addTeamInOrg($cookies.get('organisationId'),data)
                      .then((data)=>{
                        console.log("team added in organisation");
                      });
            this.Auth.createChannel(data)
                      .then((data)=>{

                        console.log(data);
                        console.log("channel created with team id");

                        this.Auth.addChannelInTeam({channelId:data._id,teamId:data.team})
                                  .then((data)=>{
                                    console.log('channel added in team');

                                  })

                      });
          var postData = {
            email: this.team.email,
            name: this.team.name,
            message: 'You have been requested to join '+name+'! '
            +'Please Click on the following link to join 127.0.0.1:3000/signup/' 
            + data + '/' + $cookies.get('organisationId') + "/" + $cookies.get('organisation')
            + "/teamLead"
            };

            this.$http.post('/email', postData)
             .success(function(data) {
               // Show success message
               console.log('Mail sent successfully');
             })
             .error(function(data) {
               // Show error message
                 console.log(' XXX Error: mail not sent! ');
             });

          console.log("added in team");
        })
        .catch(err =>{
          console.log(err.message);
        });


         }
}

export default angular.module('yoCollabaFinalApp.organisationDashBoard', [])
  .controller('OrganisationDashBoardController', organisationDashBoardController)
  .name;
