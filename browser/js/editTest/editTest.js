'use strict';

app.config(function ($stateProvider) {
    $stateProvider.state('testeditor', {
        url: '/editTest/:testId',
        templateUrl: process.cwd() + '/browser/js/editTest/editTest.html',
        controller: 'TestEditorCtrl',
        resolve: {
            test: function($http, $stateParams) {
                return $http.get('http://localhost:1337/api/tests/' + $stateParams.testId)
                .then(res => res.data)
                .then(test => {
                    test.validators = JSON.parse(test.validators);
                    if (typeof test.validators === 'string') { test.validators = JSON.parse(test.validators); }
                    return test;
                });
            }
        }
    });
});

app.controller('TestEditorCtrl', function($scope, test, TestBuilderFactory, $rootScope, $state, $log, TestFactory, $mdDialog, $mdMedia){

    $scope.test = test;

    TestFactory.getStackTests(test)
    .then(stackTests => $scope.stackTests = stackTests)
    .catch($log.error);

    if (typeof $scope.test.body.data === 'string')  $scope.test.body.data = JSON.parse($scope.test.body.data);
    $scope.test.user = $rootScope.user;
    $scope.showParams = false;
    $scope.showHeaders = false;
    $scope.showBody = false;
    $scope.showValidators = false;
    $scope.numParams = 0;
    $scope.numHeaders = 0;
    $scope.numBodyObj = 0;
    $scope.addForm = function(index, type){
        if (type === 'validator') $scope.test.validators.push({name: $scope.test.name + (Number($scope.test.validators.length) + 1).toString(), func: "(function(response) {\n\n});"});
        else if (index === $scope.test[type].length - 1 || $scope.test[type].length === 0 || index === $scope.test[type].data.length - 1 || $scope.test[type].data.length === 0) {
            if (type === "params") {
                $scope.numParams++;
                $scope.test.params.push({});
            }
            else if (type === "headers") {
                $scope.numHeaders++;
                $scope.test.headers.push({});
            }
            else if (type === "body") {
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
    };

    $scope.displayHeaders = function(){
        if ($scope.test.headers.length === 0) {
            $scope.addForm(0,"headers");
            $scope.numHeaders++;
        }
        $scope.showHeaders = !$scope.showHeaders;
    };

    $scope.displayBody = function(){
        if ($scope.test.body.data.length === 0) {
            $scope.addForm(0,"body");
            $scope.numBodyObj++;
        }
        $scope.showBody = !$scope.showBody;
    };

    $scope.displayValidators = function(){
        if ($scope.test.validators.length === 0) {
            $scope.addForm(0,"validator");
        }
        $scope.showValidators = !$scope.showValidators;
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

    $scope.setToggle = function(){
        $scope.toggle = !$scope.toggle;
        $scope.$evalAsync();
    };

    $scope.intermediary = function(){
        $scope.setToggle();
        window.setTimeout($scope.saveTest, 800);
    };

    $scope.saveTest = function(){
        var currentDate = new Date();
        var time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds()
        console.log("before TestBuilderFactory.create", time);
        TestBuilderFactory.edit($scope.test)
        .then(() =>  {
            currentDate = new Date();
            var time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds()
            console.log("going to new state", time);
            $state.go('allTests')
        })
        .catch($log.error);
    };

    $scope.viewPreviousResults  = function(test) {
      if (!test.result) { alert ("NO RESULT TO SHOW"); }
      else {
        TestFactory.getPreviousResults(test)
        .then(function(result) {
          $scope.results = result;
          $scope.showResults(test);
        })
        .catch($log.error);
      }
    };

    $scope.showResults = function(test) {
        $mdDialog.test = test;
        $mdDialog.results = $scope.results;
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        $mdDialog.show({
            controller: DialogController,
            templateUrl: process.cwd() + '/browser/js/common/directives/testbuilder/testResults.html',
            parent: angular.element(document.body),
            //targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen
        });
    };

    $scope.runTest = function() {

        //Populate the responsePool with results from earlier tests, if required
        TestFactory.clearResponsePool();
        $scope.stackTests.forEach(test => {
            let data = {
                name: test.name,
                response: JSON.parse(test.response)
            };
            TestFactory.addToResponsePool(data);
        });

        let funcArray = [];
        let cancelTest = false;
        $scope.results = {
            validatorResults: [],
            lastRun: Date.now()
        };
        if (typeof $scope.test.validators === 'string') $scope.test.validators = JSON.parse($scope.test.validators);
        $scope.test.validators.forEach(function (elem) {
            try {
                if (elem.func.length > 26) {
                    funcArray.push(eval(elem.func));
                }
            }
            catch(err) {
                alert('There was an error parsing the ' + elem.name + ' validator function. Refactor that function and try again.');
                cancelTest = true;
            }

        });
        if (cancelTest) return;

        TestFactory.runTest($scope.test)
        .then(function(resData) {

            $scope.test.response = JSON.stringify(resData);

            for (var i = 0; i < funcArray.length; i++) {
                try {
                    $scope.results.validatorResults.push(!!funcArray[i](resData));
                }
                catch (err){
                    alert('The following error occured while running the ' + $scope.test.validators[i].name + ' validator function: ' + err.message + '. Refactor that function and try again.');
                    return;
                }
            }
            if ($scope.results.validatorResults.length) $scope.results.finalResult = $scope.results.validatorResults.every(validatorResult => validatorResult);
            return TestFactory.saveResults($scope.results, $scope.test);
        })
        .then(function(test) {
            $scope.test.result = test.result._id;
            $scope.showResults(test);
        })
        .catch($log.error);
    };

    function DialogController($scope, $mdDialog) {
        $scope.test = $mdDialog.test;
        if (typeof $scope.test.validators === 'string') {
            $scope.test.validators = JSON.parse($scope.test.validators);
            console.log("MODIFIED DIALOG TESTS", $scope.test.validators);
        }
        console.log("DIALOG TESTS", $scope.test);
        $scope.results = $mdDialog.results;
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }

});
