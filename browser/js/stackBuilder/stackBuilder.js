app.config(function ($stateProvider) {
    $stateProvider.state('stackBuilder', {
        url: '/stackbuilder',
        templateUrl: 'js/stackBuilder/stackBuilder.html',
        controller: 'StackBuilderCtrl',
        resolve: {
            user: function(AuthService) {
                return AuthService.getLoggedInUser();
            },
            tests: function($http, user) {
                return $http.get('/api/tests?userId=' + user._id)
                .then(res => res.data);
            }
        }
    });
});

app.factory('StackBuilderFactory', function($http, TestBuilderFactory) {
    return {
        create: function(stackObj) {
            let newTests = stackObj.tests.map(test => TestBuilderFactory.create(test));
            return Promise.all(newTests)
            .then(savedTests => stackObj.tests = savedTests)
            .then( () => $http.post('/api/stacks', stackObj))
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
        let copyOfTest = _.cloneDeep(test);
        copyOfTest.name = copyOfTest.name + '(' + $scope.stack.name + ')';
        $scope.stack.tests.push(copyOfTest);
        $scope.$evalAsync();
    };
    $scope.removeFromStack = function (index) {
        $scope.stack.tests.splice(index, 1);
        $scope.$evalAsync();
    };
});
