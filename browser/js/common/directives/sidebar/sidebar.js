'use strict';

app.directive('sidebar', function () {
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/sidebar/sidebar.html',
    controller: 'sidebarCtrl'
  };
});

app.controller('sidebarCtrl', function($scope, $rootScope) {
  console.log('HELLO', $rootScope.user._id);
  $scope.userId = $rootScope.user._id;
});

