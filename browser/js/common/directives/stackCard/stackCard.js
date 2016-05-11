app.directive('stackCard', function() {
  return {
    restrict: 'E',
    scope: {
      stack: '='
    },
    templateUrl: 'js/common/directives/stackCard/stackCard.html'
  };
});
