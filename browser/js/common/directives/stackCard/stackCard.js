app.directive('stackCard', function() {
  return {
    restrict: 'E',
    scope: {
      stack: '='
    },
    templateUrl: 'js/common/directives/stackCard/stackCard.html',
    controller: 'StackCardCtrl'
  };
});

app.controller('StackCardCtrl', function ($scope, $rootScope, StackBuilderFactory, $mdDialog) {

  $scope.showConfirm = function(stack) {
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
