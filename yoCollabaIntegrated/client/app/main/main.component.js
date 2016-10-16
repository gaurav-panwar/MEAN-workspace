import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  $http;
  socket;
  awesomeThings = [];
  newThing = '';

  /*@ngInject*/
  constructor($http, $scope, socket) {
    
    this.$http = $http;
    this.socket = socket;
    this.showSearch = false;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {
    this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
        this.socket.syncUpdates('thing', this.awesomeThings);
      });
  }

  addThing() {
    if(this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }



  check() {
    console.log("Inside Organization Find.");
    console.log(this.organisation);
    var vm = this;

    this.$http.post('/api/organisations/findOrgbyNamePartial', {name:this.organisation})
     .success(function(data) {
       //console.log(data);
        if(data)
        {
            console.log("Organization Exists");
            vm.orgSearch = data;
            console.log(vm.orgSearch);
            vm.showSearch = true;
        } 
        else {
            console.log("Does not exist");
            vm.orgSearch = "Does not exist";
            vm.showSearch = false;
        }
          
     })
     .error(function(data) {
       // Show error message
         console.log(' Error ');
     });

  }



  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }
}

export default angular.module('yoCollabaFinalApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
