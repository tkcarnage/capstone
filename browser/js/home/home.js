app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/home', //TEST :id and trailing slash
        templateUrl: 'js/home/home.html',
        controller: 'homeCtrl',
        resolve: {
            user: function(AuthService) {
                return AuthService.getLoggedInUser();
            },
            stacks: function($http, user, StackBuilderFactory) {
                return StackBuilderFactory.getUserStacks(user);
            }
        }
    });
});

app.controller('homeCtrl', function ($scope, $state, user, stacks, SidebarFactory, SignupFactory, $rootScope, StackBuilderFactory, $mdDialog) {
    $scope.user = user;
    $scope.stacks = function() {
        return StackBuilderFactory.getStacks();
    };

    $scope.showConfirm = function(stack) {

      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
      .title("Confirm Deletion")
      .ariaLabel('Delete')
      .ok('Delete')
      .cancel('Cancel');
      $mdDialog.show(confirm).then(function() {
        return StackBuilderFactory.delete(stack);
      }, function() {
        $scope.status = 'Delete cancelled';
    });
  };
});
