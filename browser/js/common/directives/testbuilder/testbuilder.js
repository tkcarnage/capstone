'use strict';

app.config(function ($stateProvider) {
    $stateProvider.state('testbuilder', {
        url: '/:id/testbuilder',
        template: '<testbuilder><testbuilder>'
    });
});



app.directive('testbuilder', function(){
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/testbuilder/testbuilder.html',
    controller: 'TestbuilderCtrl'
  };
});

app.controller('TestbuilderCtrl', function($scope, TestBuilderFactory, $rootScope){
	$scope.test = {};
	$scope.test.user = $rootScope.user;
	console.log($scope.test.user);
	$scope.test.url = 'http://';
	$scope.test.params = [];
	$scope.test.headers = [];
	$scope.test.body = {};
	$scope.test.body.data = [];
	$scope.test.method = "GET";
	$scope.showParams = false;
	$scope.showHeaders = false;
	$scope.showBody = false;
	$scope.numParams = 0;
	$scope.numHeaders = 0;
	$scope.numBodyObj = 0;
	$scope.addForm = function(index, type){

		if (index === $scope.test[type].length - 1 || $scope.test[type].length === 0) {
			if (type === "params") {
				$scope.numParams++;
				$scope.test.params.push({});
			}
			else if (type === "headers") {
				$scope.numHeaders++;
				$scope.test.headers.push({});
			}
			else if (type === "body.data") {
				$scope.numBodyObj++;
				$scope.test.body.data.push({});
			}
		}

		$scope.$evalAsync();
	};

	$scope.showForm = function(){
		if ($scope.test.params.length === 0) {
			$scope.addForm(0,"params");
			$scope.numParams++;
		}
		$scope.showParams = !$scope.showParams;
		console.log($scope.test.params);
		$scope.evalAsync;
	};

	$scope.displayHeaders = function(){
		if ($scope.test.headers.length === 0) {
			$scope.addForm(0,"headers");
			$scope.numHeaders++;
		}
		$scope.showHeaders = !$scope.showHeaders;
		console.log($scope.test.headers);
		$scope.evalAsync;
	};

	$scope.displayBody = function(){
		if ($scope.test.body.data.length === 0) {
			$scope.addForm(0,"body.data");
			$scope.numBodyObj++;
		}
		$scope.showBody = !$scope.showBody;
		$scope.evalAsync;
	};

	$scope.composeURL = function() {
		var indexQuestionMark = $scope.test.url.indexOf('?');
		if (indexQuestionMark !== -1) {
			$scope.test.url = $scope.test.url.substring(0,indexQuestionMark);
		}
		$scope.test.url += '?';
		var finalString = '';
		for(var i = 0; i < $scope.test.params.length - 1; i++) {
			finalString = finalString + $scope.test.params[i].key + '=' + $scope.test.params[i].value + '&';
		}
		$scope.test.url  = $scope.test.url + finalString;
		$scope.test.url = $scope.test.url.slice(0,$scope.test.url.length - 1);
	};

	$scope.submitTest = function(){
		$scope.test.url = $scope.test.url;
		TestBuilderFactory.create($scope.test);
	};



});
