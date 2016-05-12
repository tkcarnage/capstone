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
    };
});

app.controller('StackViewCtrl', function($scope, $state, $log, stack, StackViewFactory) {
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
});
