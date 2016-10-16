'use strict';
const angular = require('angular');


export default angular.module('yoCollabaFinalApp.organisationRegister', [])
  .controller('OrganisationRegisterController', organisationRegisterController)
  .name;

  /*@ngInject*/
  export function organisationRegisterController(Auth,$state) {
    this.Auth=Auth;
    this.$state = $state;



      this.register = function (form) {
        Auth.register({
        name: this.name,
        email: this.email,
        domain: this.domain,
        phone: this.phone,
        password: this.password,
        website: this.website,
        address: this.address,
        about: this.about
      });

    this.$state.go('loginOrganisation');

  }


  }
