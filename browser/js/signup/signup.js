'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, AuthService, $state, SignupFactory) {

  $scope.incongruentPasswords = false;

    $scope.createUser = function(signupInfo) {
      if(signupInfo.passwordA !== signupInfo.passwordB){
        $scope.incongruentPasswords = true;
      } else {
        SignupFactory.createNewUser({email: signupInfo.email, password: signupInfo.passwordA, username: signupInfo.username, firstName: signupInfo.firstName, lastName: signupInfo.lastName, isAdmin: false});
        $state.go('login');
      }
    };

});
