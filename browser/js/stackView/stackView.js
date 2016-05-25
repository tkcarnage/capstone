app.config(function ($stateProvider) {
    $stateProvider.state('stackView', {
        url: '/stackView/:stackId',
        templateUrl: 'js/stackView/stackView.html',
        controller: 'StackViewCtrl',
        resolve: {
            stack: function($http, $stateParams) {
                return $http.get('https://warm-lowlands-63755.herokuapp.com/api/stacks/' + $stateParams.stackId)
                .then(res => res.data);
            }
        }
    });
});

app.factory('StackViewFactory', function($http) {
    return {
        edit: function(obj) {
            return $http.put('https://warm-lowlands-63755.herokuapp.com/api/stacks/' + obj._id, obj)
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
    var dateObj = new Date($scope.stack.lastRun);
    $scope.dateString = dateObj.toString();


});
