'use strict';

app.directive('testbuilder', function(){
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/testbuilder/testbuilder.html',
    controller: 'TestbuilderCtrl'
  };
});

app.controller('TestbuilderCtrl', function($scope){
	$scope.inputTag = 'http://';
	$scope.params = [];
	$scope.headers = [];
	$scope.reqbody = [];
	$scope.showParams = false;
	$scope.showHeaders = false;
	$scope.showBody = false;
	$scope.numParams = 0;
	$scope.numHeaders = 0;
	$scope.numBodyObj = 0;
	$scope.addForm = function(index, type){

		if (index === $scope[type].length - 1 || $scope[type].length === 0) {
			if (type === "params") {
				$scope.numParams++;
				$scope.params.push({});
			}
			else if (type === "headers") {
				$scope.numHeaders++;
				$scope.headers.push({});
			} 
			else if (type === "reqbody") {
				$scope.numBodyObj++;
				$scope.reqbody.push({});
			}
			
		}

		$scope.$evalAsync();
	};

	$scope.showForm = function(){
		if ($scope.params.length === 0) {
			$scope.addForm(0,"params");
			$scope.numParams++;
		}
		$scope.showParams = !$scope.showParams;  
		console.log($scope.params);
		$scope.evalAsync;
	};

	$scope.displayHeaders = function(){
		if ($scope.headers.length === 0) {
			$scope.addForm(0,"headers");
			$scope.numHeaders++;
		}
		$scope.showHeaders = !$scope.showHeaders;  
		console.log($scope.headers);
		$scope.evalAsync;
	};

	$scope.displayBody = function(){
		if ($scope.reqbody.length === 0) {
			$scope.addForm(0,"reqbody");
			$scope.numBodyObj++;
		}
		$scope.showBody = !$scope.showBody;  
		$scope.evalAsync;
	};

	$scope.composeURL = function() {
		var indexQuestionMark = $scope.inputTag.indexOf('?');
		if (indexQuestionMark !== -1) {
			$scope.inputTag = $scope.inputTag.substring(0,indexQuestionMark);
		}
		$scope.inputTag += '?';
		var finalString = '';
		for(var i = 0; i < $scope.params.length - 1; i++) {
			finalString = finalString + $scope.params[i].key + '=' + $scope.params[i].value + '&';
		}
		$scope.inputTag  = $scope.inputTag + finalString;
		$scope.inputTag = $scope.inputTag.slice(0,$scope.inputTag.length - 1);
	};
});