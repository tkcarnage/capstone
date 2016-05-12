'use strict';

app.directive('sidebar', function () {
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/sidebar/sidebar.html',
    controller: 'sidebarCtrl'

  };
});

app.controller('sidebarCtrl', function($scope, $log, $rootScope, SidebarFactory) {
  $scope.user = $rootScope.user;
  $scope.userId = $rootScope.user._id;
  console.log("rootSCope user", $rootScope.user);

  SidebarFactory.getStacks($scope.userId)
    .then(stacks => $scope.stacks = stacks)
    .then(() => $scope.$evalAsync())
    .catch($log.error);
});
