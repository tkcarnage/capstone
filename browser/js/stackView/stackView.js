app.config(function ($stateProvider) {
    $stateProvider.state('stackView', {
        url: '/stackView/:stackId',
        templateUrl: 'js/stackView/stackView.html',
        controller: 'StackViewCtrl',
        resolve: {
            stack: function($http, $stateParams) {
                return $http.get('/api/stacks/' + $stateParams.stackId)
                .then(res => res.data);
            }
        }
    });
});

app.factory('StackViewFactory', function($http) {
    return {
        edit: function(obj) {
            return $http.put('/api/stacks/' + obj._id, obj)
            .then (response => response.data);
        },
        getTestWithStatus: function (arr, status) {
            return arr.filter(function(ele){
                return ele.body.result === status;
            });
        },
        getPercent: function(arr, totallen) {
            return (arr.length / totallen) * 100;
        }
    };
});

app.controller('StackViewCtrl', function($scope, $rootScope, $state, $log, stack, StackViewFactory, TestFactory) {
    $scope.stack = stack;
    $scope.removeFromStack = function (index) {
        $scope.stack.tests.splice(index, 1);
        $scope.$evalAsync();
    };
    $scope.submitStack = function () {
        StackViewFactory.edit($scope.stack)
        .then(() => $scope.$evalAsync() )
        .then(() => alert("Your changes were saved!"))
        .catch($log.error);
    };


    $scope.newTests = StackViewFactory.getTestWithStatus($scope.stack.tests, "New");
    $scope.failTests = StackViewFactory.getTestWithStatus($scope.stack.tests, "Failing");
    $scope.passTests = StackViewFactory.getTestWithStatus($scope.stack.tests, "Passing");
    $scope.newPercent = StackViewFactory.getPercent($scope.newTests, $scope.stack.tests.length);
    $scope.failPercent = StackViewFactory.getPercent($scope.failTests, $scope.stack.tests.length);
    $scope.passPercent = StackViewFactory.getPercent($scope.passTests, $scope.stack.tests.length);

    $(function(){
      var $ppc = $('.progress-pie-chart'),
        percent = $scope.passPercent.toFixed(0),
        deg = 360*percent/100;
      if (percent > 50) {
        $ppc.addClass('gt-50');
      }
      $('.ppc-progress-fill').css('transform','rotate('+ deg +'deg)');
      $('.ppc-percents span').html(percent+'%');
    });

//
    //running stack from here
  //   $scope.runTests = function(stack) {
  //   stack.tests.forEach(test => {
  //     let funcArray = [];
  //     let cancelTest = false;
  //     let results = {
  //         validatorResults: [],
  //         lastRun: Date.now()
  //     };
  //     if (typeof test.validators === 'string') test.validators = JSON.parse(test.validators);
  //     test.validators.forEach(function (elem) {
  //       try {
  //           if (elem.func.length > 23) {
  //               funcArray.push(eval('(' + elem.func + ')'));
  //           }
  //       }
  //       catch(err) {
  //           alert('There was an error parsing the ' + elem.name + ' validator function. Refactor that function and try again.');
  //           cancelTest = true;
  //       }
  //     });
  //     if (cancelTest) return;
  //     TestFactory.runTest(test)
  //     .then(function(resData) {
  //       for (var i = 0; i < funcArray.length; i++) {
  //           try {
  //               results.validatorResults.push(!!funcArray[i](resData));
  //           }
  //           catch (err){
  //               alert('The following error occured while running the ' + test.validators[i].name + ' validator function: ' + err.message + '. Refactor that function and try again.');
  //               return;
  //           }
  //       }
  //       results.finalResult = results.validatorResults.every(validatorResult => validatorResult);
  //       return TestFactory.saveResults(results, test._id);
  //     })
  //     .then(updatedTest => {
  //       let dataObj = {
  //         test: updatedTest,
  //         stack: stack
  //       };
  //       $rootScope.$emit('testUpdate', dataObj);
  //     })
  //     .catch($log.error);
  //   });
  // };




});
