/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';

//Seed the App Features into the Database
Thing.find({}).remove()
  .then(() => {
    Thing.create({
      name: 'Chat with Colleagues',
      info: 'Chat with your Colleagues easily and seamlessly for easy Collaboration.'
    }, {
      name: 'Register your Organization',
      info: 'Register your Organization with us for seamlessly connecting with everybody in the Organization.'
    }, {
      name: 'Create Teams and Channels',
      info: 'Teams and Channels help you interact with people working on a project for focussed discussions.'
    });
  });


//Remove existing and Seed new Users into the Database
User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
