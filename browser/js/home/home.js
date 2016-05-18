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

app.controller('homeCtrl', function ($scope, user, stacks, $rootScope) {
  $scope.user = user;
  $scope.stacks = stacks;

  $rootScope.$on('createstack', function(event, data){
    $scope.stacks.push(data);
  });

  $rootScope.$on('deletestack', function(event, data){
    $scope.stacks = $scope.stacks.filter(function(ele){
      return data !== ele._id;
    });
  });
});
