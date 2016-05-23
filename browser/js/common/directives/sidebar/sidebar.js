'use strict';

app.directive('sidebar', function () {
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/sidebar/sidebar.html',
    controller: 'sidebarCtrl'
  };
});

app.controller('sidebarCtrl', function($scope, $log, $rootScope, StackBuilderFactory, AuthService) {

  AuthService.getLoggedInUser().then(function(user){
    $scope.user = user;
  });

  StackBuilderFactory.getUserStacks($scope.user)
  .then(function(stacks){
    $scope.stacks = stacks;
  });

  $rootScope.$on('createstack', function(event, data){
    console.log('heard the event');
    $scope.stacks.push(data);
    console.log('$scope.stacks:', $scope.stacks);
    $scope.$evalAsync();
  });

  $rootScope.$on('deletestack', function(event, data){
    $scope.stacks = $scope.stacks.filter(function(ele){
      return data !== ele._id;
    });
  });
});
