'use strict';

const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routes from './organization.routes';
//var OrgServe = require('./organization.service');


export class OrganizationComponent {
  
  org = {
    name: '',
    email: '',
    address: '',
    password: ''
  };
  errors = {};
  submitted = false;
  vm = this;

/*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }

  createOrg(org) {
      return $http.post('organizations/', org)
        .success(function(data) {
          console.log('Organization Creation Success.');
          console.log(data);
        })
        .error(function(err) {
          console.error(err);
          $location.path('/organization');
        });
    }

  register(form) {
    this.submitted = true;
   // console.log(OrgServe);
    if(form.$valid) {
      return vm.createOrg({
        name: this.org.name,
        email: this.org.email,
        address: this.org.address,
        password: this.org.password
        })
        .then(() => {
          // Account created, redirect to home
          this.$state.go('main');
        })
        .catch(err => {
          err = err.data;
          this.errors = {};
          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, (error, field) => {
            form[field].$setValidity('mongoose', false);
            this.errors[field] = error.message;
          });
        });
    }
  }

  
}

export default angular.module('yoCollabaApp.organization', [uiRouter])
  .config(routes)
  .component('organization', {
    template: require('./organization.html'),
    controller: OrganizationComponent,
    controllerAs: 'vm'
  })
  /*.service('OrgService', ['$http', '$location', OrgServe])*/
  .name;
