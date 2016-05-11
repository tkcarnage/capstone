app.config(function ($stateProvider) {
    $stateProvider.state('stackBuilder', {
        url: '/:userId/stackbuilder',
        templateUrl: 'js/stackBuilder/stackBuilder.html',
        controller: 'StackBuilderCtrl',
        resolve: {
            tests: function($http, $stateParams) {
                return $http.get('/api/tests?userId=' + $stateParams.userId)
                .then(res => res.data);
            }
        }
    });
});

app.factory('StackBuilderFactory', function($http) {
    return {
        create: function(stackObj) {
            return $http.post('/api/stacks', stackObj)
            .then(res => res.data);
        },
    };
});

app.controller('StackBuilderCtrl', function($scope, $state, $log, tests, StackBuilderFactory, $rootScope) {
    $scope.tests = tests;
    $scope.stack = {};
    $scope.stack.user = $rootScope.user;
    $scope.stack.userId = $rootScope.user._id;
    $scope.stack.tests = [];
    $scope.submitStack = function () {
        StackBuilderFactory.create($scope.stack)
        .then(stack => $state.go('stackView', {stackId: stack._id}))
        .catch($log.error);
    };
    $scope.addToStack = function (test) {
        $scope.stack.tests.push(test);
        $scope.$evalAsync();
    };
    $scope.removeFromStack = function (index) {
        $scope.stack.tests.splice(index, 1);
        $scope.$evalAsync();
    };
});
