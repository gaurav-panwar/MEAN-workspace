'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('organization', {
      url: '/organization',
      template: '<organization></organization>'
    });
}
