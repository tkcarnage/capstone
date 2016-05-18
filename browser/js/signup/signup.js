'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, AuthService, $state, SignupFactory, $mdToast, $log) {

  $scope.error = null;

    $scope.createUser = function(signupInfo) {
      if(signupInfo.passwordA !== signupInfo.passwordB){
        $scope.error = 'Your passwords don\'t match.';
      } else {
        SignupFactory.createNewUser({email: signupInfo.email, password: signupInfo.passwordA, username: signupInfo.username, firstName: signupInfo.firstName, lastName: signupInfo.lastName, isAdmin: false})
        .then($scope.showSuccessToast())
        .then($state.go('login'))
        .catch($log.error);
      }
    };
      $scope.showSuccessToast = function() {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Sign up successful.')
            .position('bottom right')
            .hideDelay(2000)
        );
    };

});
