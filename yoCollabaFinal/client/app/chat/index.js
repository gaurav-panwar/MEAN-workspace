'use strict';

import angular from 'angular';
import routes from './chat.routes';
import ChatController from './chat.controller';

export default angular.module('yoCollabaFinalApp.chat', ['yoCollabaFinalApp.auth', 'ui.router'])
  .config(routes)
  .controller('ChatController', ChatController)
  .name;
