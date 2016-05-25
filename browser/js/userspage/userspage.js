app.config(function ($stateProvider) {
    $stateProvider.state('userspage', {
        url: '/userpage',
        templateUrl: 'js/userspage/userspage.html',
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        data: {
            authenticate: true
        },
        controller: 'usersPageCtrl',
        resolve: {
            user: function(AuthService) {
                return AuthService.getLoggedInUser();
            }
        }
    });
});

app.factory('UsersPageFactory', function($http) {
    return {
        saveChanges: function(user) {
            return $http.put('https://warm-lowlands-63755.herokuapp.com/api/users/' + user._id, user)
            .then(res => res.data);
        }
    };
});

app.controller('usersPageCtrl', function($log, $mdToast, $scope, user, UsersPageFactory) {
    $scope.user = user;
    $scope.saveChanges = function() {
        UsersPageFactory.saveChanges($scope.user)
        .then(() => $scope.showSuccessToast())
        .catch($log.error);
    };
    $scope.showSuccessToast = function() {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Changes saved.')
            .position('bottom right')
            .hideDelay(2000)
        );
    };
})
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('customBackground', 'default')
      .primaryPalette('customBackground');
});





