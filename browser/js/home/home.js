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

app.controller('homeCtrl', function ($scope, user, stacks, $rootScope, StackBuilderFactory, $log) {
  $scope.user = user;
  $scope.stacks = stacks;

  $rootScope.$on('deletestack', function(event, data){
    $scope.stacks = $scope.stacks.filter(function(ele){
      return data !== ele._id;
    });
  });

  $rootScope.$on('testUpdate', function(event, dataObj){

      var updatedStack = $scope.stacks.filter(function(stack) {
        return stack._id == dataObj.stack._id;
      })[0];

      var updatedTest = updatedStack.tests.filter(function(test) {
        return test._id == dataObj.test._id;
      })[0];

      updatedTest.body.result = dataObj.test.body.result;
  });
});
