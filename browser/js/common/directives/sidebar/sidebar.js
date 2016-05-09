'use strict';

app.directive('sidebar', function () {
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/sidebar/sidebar.html',
    controller: 'sidebarCtrl'
  };
});


app.controller('sidebarCtrl', function ($scope, SidebarFactory) {
    $scope.stacks = SidebarFactory.stacks;
    console.log($scope.stacks);
});
