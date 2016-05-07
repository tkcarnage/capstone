'use strict';

app.directive('testbuilder', function(){
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/testbuilder/testbuilder.html',
    controller: 'TestbuilderCtrl',
  };
});

app.controller('TestbuilderCtrl', function($scope){
	$scope.params = [];
	$scope.showParams = false;
	$scope.numParams = 0;
	$scope.addForm = function(index){
		// var url = angular.element(document.querySelector('#urlinput'));
		// var body = document.body;
		// //var inputTag = angular.element('<input width="600" height="100" class="key"></input><input width="600" height="100" class="value">');
		// var inputTag = angular.element('<p>test</p>');
		// console.log("TRUE");
		// url.append(inputTag);
		// $scope.$evalAsync();
		if (index === $scope.params.length - 1 || $scope.params.length === 0) {
			$scope.numParams++;
			$scope.params.push({});
		}
	};
	$scope.showForm = function(){
		if ($scope.params.length === 0) {
			$scope.addForm();
			$scope.numParams++;
		}
		$scope.showParams = !$scope.showParams;
	};
});
