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

app.controller('StackCardCtrl', function ($scope, $rootScope, StackBuilderFactory, $mdDialog, TestFactory, $log) {

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
    stack.tests.forEach(test => {
      let funcArray = [];
      let cancelTest = false;
      let results = {
          validatorResults: [],
          lastRun: Date.now()
      };
      if (typeof test.validators === 'string') test.validators = JSON.parse(test.validators);
      test.validators.forEach(function (elem) {
        try {
            if (elem.func.length > 23) {
                funcArray.push(eval('(' + elem.func + ')'));
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
        for (var i = 0; i < funcArray.length; i++) {
            try {
                results.validatorResults.push(!!funcArray[i](resData));
            }
            catch (err){
                alert('The following error occured while running the ' + test.validators[i].name + ' validator function: ' + err.message + '. Refactor that function and try again.');
                return;
            }
        }
        results.finalResult = results.validatorResults.every(validatorResult => validatorResult);
        return TestFactory.saveResults(results, test._id);
      })
      .then(updatedTest => {
        let dataObj = {
          test: updatedTest,
          stack: stack
        };
        $rootScope.$emit('testUpdate', dataObj);
      })
      .catch($log.error);
    });
  };
});
