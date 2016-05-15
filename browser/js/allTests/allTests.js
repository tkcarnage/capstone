app.config(function ($stateProvider) {
    $stateProvider.state('allTests', {
        url: '/allTests',
        templateUrl: 'js/allTests/allTests.html',
        controller: 'allTestsCtrl',
        resolve: {
            allTests: function($http, $stateParams, AuthService) {
                return AuthService.getLoggedInUser()
                .then(function(user) {
                    return $http.get('/api/tests?userId=' + user._id);
                })
                .then(function(response) {
                    return response.data;
                });
            }
        }
    });
});


// app.controller('allTestsCtrl',function($scope, allTests) {
//     $scope.allTests = allTests;
// });


app.controller('allTestsCtrl', function ($mdEditDialog, $mdDialog, $q, $state, $scope, $timeout, allTests, TestBuilderFactory) { //allTests injected here
  'use strict';

  $scope.selected = [];
  $scope.limitOptions = [5, 10, 15, 50];

  $scope.options = {
    rowSelection: true,
    multiSelect: true,
    autoSelect: true,
    decapitate: false,
    largeEditDialog: false,
    boundaryLinks: false,
    limitSelect: true,
    pageSelect: true
  };

  $scope.query = {
    order: 'name',
    limit: 50,
    page: 1
  };

  $scope.tests = allTests;

  $scope.editComment = function (event, dessert) {
    event.stopPropagation(); // in case autoselect is enabled

    var editDialog = {
      modelValue: dessert.comment,
      placeholder: 'Add a comment',
      save: function (input) {
        if(input.$modelValue === 'Donald Trump') {
          input.$invalid = true;
          return $q.reject();
        }
        if(input.$modelValue === 'Bernie Sanders') {
          return dessert.comment = 'FEEL THE BERN!'
        }
        dessert.comment = input.$modelValue;
      },
      targetEvent: event,
      title: 'Add a comment',
      validators: {
        'md-maxlength': 30
      }
    };

    var promise;

    if($scope.options.largeEditDialog) {
      promise = $mdEditDialog.large(editDialog);
    } else {
      promise = $mdEditDialog.small(editDialog);
    }

    promise.then(function (ctrl) {
      var input = ctrl.getInput();

      input.$viewChangeListeners.push(function () {
        input.$setValidity('test', input.$modelValue !== 'test');
      });
    });
  };

  $scope.toggleLimitOptions = function () {
    $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
  };

  $scope.getTypes = function () {
    return ['Candy', 'Ice cream', 'Other', 'Pastry'];
  };

  $scope.loadStuff = function () {
    $scope.promise = $timeout(function () {
      // loading
    }, 2000);
  };

  $scope.deletetests = function () {
    var deleted = $scope.selected.map(function(test){
      return TestBuilderFactory.delete(test);
    });

    return  Promise.resolve(3);
  };

  $scope.logItem = function (item) {
    console.log(item.name, 'was selected');
  };

  $scope.logOrder = function (order) {
    console.log('order: ', order);
  };

  $scope.logPagination = function (page, limit) {
    console.log('page: ', page);
    console.log('limit: ', limit);
  };

  $scope.showConfirm = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
      .title("Confirm Deletion")
      .ariaLabel('Delete')
      .targetEvent(ev)
      .ok('Delete')
      .cancel('Cancel');
      $mdDialog.show(confirm).then(function() {
        $scope.deletetests()
        .then(function(){
          $scope.tests = $scope.tests.filter(function(ele){
            return $scope.selected.indexOf(ele) === -1; 
          });
          $scope.selected = [];
          $scope.$evalAsync();
        });
      }, function() {
        $scope.status = 'Delete cancelled';
      });
  };

});


