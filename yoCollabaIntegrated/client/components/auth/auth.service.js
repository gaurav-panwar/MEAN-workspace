'use strict';
// @flow

class _User {
  _id: string = '';
  name: string = '';
  email: string = '';
  role: string = '';
  $promise = undefined;
}

export function AuthService($location, $http, $cookies, $q, appConfig, Util, User, Team, Organisation, Channel) {
  'ngInject';

  var safeCb = Util.safeCb;
  var currentUser: _User = new _User();
  var userRoles = appConfig.userRoles || [];
  /**
   * Check if userRole is >= role
   * @param {String} userRole - role of current user
   * @param {String} role - role to check against
   */
  var hasRole = function(userRole, role) {
    return userRoles.indexOf(userRole) >= userRoles.indexOf(role);
  };

  if($cookies.get('token') && $location.path() !== '/logout') {
    currentUser = User.get();
  }

  var Auth = {

    register(organisation){
      console.log(organisation);
      Organisation.save(organisation);
    },

    acceptOrganisation(organisation){
      console.log(organisation);
      Organisation.accept(organisation);
    },



    /**
     * Authenticate user and save token
     *
     * @param  {Object}   user     - login info
     * @param  {Function} callback - function(error, user)
     * @return {Promise}
     */
    login({

      email,
      password
    }, callback ? : Function) {
      return $http.post('/auth/local', {
        email,
        password
      })
        .then(res => {
          console.log(res.data);
          $cookies.put('token', res.data.token);
          currentUser = User.get();
          return currentUser.$promise;
        })
        .then(user => {
          safeCb(callback)(null, user);
          return user;
        })
        .catch(err => {
          Auth.logout();
          safeCb(callback)(err.data);
          return $q.reject(err.data);
        });
    },
    loginOrganisation(org){
      console.log("here finding");
      return Organisation.find(org)
            .$promise.then((data) =>{
              $cookies.put('organisation', data.name);
              $cookies.put('organisationId', data._id);

              console.log("inside Found");
              console.log(data);
              return data;
            });


    },
    /**
     * Delete access token and user info
     */
    logout() {
      $cookies.remove('token');
      currentUser = new _User();
    },

    /**
     * Create a new user
     *
     * @param  {Object}   user     - user info
     * @param  {Function} callback - function(error, user)
     * @return {Promise}
     */
     addUser(data){

        return User.add(data)
                    .$promise.then((data) =>{
                      console.log(data);
                      return data;
                    })


     },
     addTeamInOrg(orgId,teamId){

       return Organisation.updateTeam({'organisationId':orgId,'teamId':teamId})
                          .$promise.then((data)=>{
                            console.log(data);
                            return data;
                          })

     },
     populateUserId(orgId,teamId,userId){

        Organisation.addUser({'organisationId':orgId,'userId':userId})
                    .$promise.then((data)=>{
                      console.log("user added in organisation");
                      Channel.addUser({'teamId':teamId,'userId':userId})
                              .$promise.then((data) => {
                                console.log('user added in channel');
                                User.addChannel({'channelId':data._id,'userId':userId})
                                    .$promise.then((data) => {
                                      console.log('channel added in user');
                                      return data;
                                    })
                              })
                      Team.addUser({'teamId':teamId,'userId':userId})
                            .$promise.then((data)=>{
                              console.log('user added in team');
                              return data;
                            })
                    })

     },
    createUser(user, callback ? : Function) {
      return User.save(user, function(data) {
        $cookies.put('token', data.token);
        currentUser = User.get();
        return safeCb(callback)(null, user);
      }, function(err) {
        Auth.logout();
        return safeCb(callback)(err);
      })
        .$promise;
    },
    addTeam(data){
      return Team.save({name:data.name,teamLeadEmail:data.email})
                  .$promise.then((data) =>{
                    console.log("saved in team databases");
                    return data._id;
                  });
    },
    addChannelInTeam(data){
      return Team.channelUpdate(data)
                  .$promise.then((data) => {
                    console.log("channel updated in team");
                    return data;
                  })

    },
    createChannel(data){
      console.log("inside createChannel");
      return Channel.save({name:'general',team:data})
                    .$promise.then((data)=>{
                      console.log("channel in db");
                      return data;
                    })
    },
    /**
     * Change password
     *
     * @param  {String}   oldPassword
     * @param  {String}   newPassword
     * @param  {Function} callback    - function(error, user)
     * @return {Promise}
     */
    changePassword(oldPassword, newPassword, callback ? : Function) {
      return User.changePassword({
        id: currentUser._id
      }, {
        oldPassword,
        newPassword
      }, function() {
        return safeCb(callback)(null);
      }, function(err) {
        return safeCb(callback)(err);
      })
        .$promise;
    },

    /**
     * Gets all available info on a user
     *
     * @param  {Function} [callback] - function(user)
     * @return {Promise}
     */
    getCurrentUser(callback ? : Function) {
      var value = _.get(currentUser, '$promise') ? currentUser.$promise : currentUser;

      return $q.when(value)
        .then(user => {
          safeCb(callback)(user);
          return user;
        }, () => {
          safeCb(callback)({});
          return {};
        });
    },

    /**
     * Gets all available info on a user
     *
     * @return {Object}
     */
    getCurrentUserSync() {
      return currentUser;
    },

    /**
     * Check if a user is logged in
     *
     * @param  {Function} [callback] - function(is)
     * @return {Promise}
     */
    isLoggedIn(callback ? : Function) {
      return Auth.getCurrentUser(undefined)
        .then(user => {
          let is = _.get(user, 'role');

          safeCb(callback)(is);
          return is;
        });
    },

    /**
     * Check if a user is logged in
     *
     * @return {Bool}
     */
    isLoggedInSync() {
      return !!_.get(currentUser, 'role');
    },

    /**
     * Check if a user has a specified role or higher
     *
     * @param  {String}     role     - the role to check against
     * @param  {Function} [callback] - function(has)
     * @return {Promise}
     */
    hasRole(role, callback ? : Function) {
      return Auth.getCurrentUser(undefined)
        .then(user => {
          let has = hasRole(_.get(user, 'role'), role);

          safeCb(callback)(has);
          return has;
        });
    },

    /**
     * Check if a user has a specified role or higher
     *
     * @param  {String} role - the role to check against
     * @return {Bool}
     */
    hasRoleSync(role) {
      return hasRole(_.get(currentUser, 'role'), role);
    },

    /**
     * Check if a user is an admin
     *   (synchronous|asynchronous)
     *
     * @param  {Function|*} callback - optional, function(is)
     * @return {Bool|Promise}
     */
    isAdmin() {
      return Auth.hasRole.apply(Auth, [].concat.apply(['admin'], arguments));
    },

    /**
     * Check if a user is an admin
     *
     * @return {Bool}
     */
    isAdminSync() {
      return Auth.hasRoleSync('admin');
    },

    /**
     * Get auth token
     *
     * @return {String} - a token string used for authenticating
     */
    getToken() {
      return $cookies.get('token');
    }
  };

  return Auth;
}
