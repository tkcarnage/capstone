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

app.controller('StackCardCtrl', function ($scope, $rootScope, StackBuilderFactory, $mdDialog, TestFactory, $log, StackViewFactory) {

  $scope.toggle = false;
  $scope.setToggle = function(){
    $scope.toggle = !$scope.toggle;
    $scope.$evalAsync();
  };

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

  $scope.runTests = function(stack) {
    $scope.setToggle();
    let tests = stack.tests.slice();

    // Recursive function that shifts a test off of the tests array with each recursive call until the array is empty
    let runTests = function(tests) {
      if (!tests.length) {
        TestFactory.clearResponsePool();
        stack.lastRun = new Date();
        return StackViewFactory.edit(stack)
        .catch($log.error);
      }
      let test = tests.shift();
      let funcArray = [];
      let cancelTest = false;
      let results = {
          validatorResults: [],
          lastRun: Date.now()
      };
      if (typeof test.validators === 'string') test.validators = JSON.parse(test.validators);
      if (typeof test.validators === 'string') test.validators = JSON.parse(test.validators);
      test.validators.forEach(function (elem) {
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
      TestFactory.runTest(test)
      .then(function(resData) {

        test.response = JSON.stringify(resData);

        TestFactory.addToResponsePool({
          name: test.name,
          response: resData
        });

        for (var i = 0; i < funcArray.length; i++) {
            try {
                results.validatorResults.push(!!funcArray[i](resData));
            }
            catch (err){
                alert('The following error occured while running the ' + test.validators[i].name + ' validator function: ' + err.message + '. Refactor that function and try again.');
                return;
            }
        }
        if (results.validatorResults.length) results.finalResult = results.validatorResults.every(validatorResult => validatorResult);
        return TestFactory.saveResults(results, test);
      })
      .then(updatedTest => {
        let dataObj = {
          test: updatedTest,
          stack: stack
        };
        $rootScope.$emit('testUpdate', dataObj);
        runTests(tests);
      })
      .catch($log.error);
    };
    runTests(tests);
    window.setTimeout($scope.setToggle, 800);
  };
});
