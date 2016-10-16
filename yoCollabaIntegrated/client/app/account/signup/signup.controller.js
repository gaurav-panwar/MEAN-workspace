'use strict';
// @flow

import angular from 'angular';

type User = {
  name: string;
  email: string;
  password: string;
};

export default class SignupController {
  user: User = {
    name: '',
    email: '',
    password: ''
  };
  errors = {};
  submitted = false;
  Auth;
  $state;

  /*@ngInject*/
  constructor(Auth, $state,$stateParams) {
    this.Auth = Auth;
    this.$state = $state;
    this.$stateParams=$stateParams;
    this.user.orgName=$stateParams.orgName;
    this.user.teamId=$stateParams.teamId;
    //alert($stateParams.teamId);

    //alert($stateParams.orgName);
  }

  register() {
    //this.submitted = true;

    alert("Signup Controller");
       this.Auth.addUser({
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        role: this.$stateParams.role,
        organisation: this.$stateParams.orgId,
        teams: [this.$stateParams.teamId]
      })
        .then((data) => {
          // Account created, redirect to home
          this.Auth.populateUserId(this.$stateParams.orgId,this.$stateParams.teamId,data._id);
          this.$state.go('login');
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
