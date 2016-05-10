'use strict';

app.directive('sidebar', function () {
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/sidebar/sidebar.html',
    controller: 'sidebarCtrl'
  };
});


app.controller('sidebarCtrl', function($scope, $rootScope, SidebarFactory) {
  console.log('HELLO', $rootScope.user._id);
  console.log('$rootScope:', $rootScope);
  $scope.userId = $rootScope.user._id;
  $scope.stacks = SidebarFactory.stacks;
});

