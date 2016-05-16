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

app.factory('StackBuilderFactory', function($http) {
    var obj = {};
        var storedStacks = [];
        obj.getStacks = function(){
            return storedStacks;
        };
        obj.getUserStacks = function(user){
            return $http.get('/api/stacks?userId=' + user._id) //TEST $stateParams.id
            .then(response => {
                angular.copy(response.data, storedStacks);
                return storedStacks;
            });
        };

        obj.create = function(stackObj) {
            return $http.post('/api/stacks', stackObj)
            .then(res => {
                return res.data;
            });
        };
        obj.delete = function(stackObj) {
            console.log("This function is running", storedStacks);
            return $http.delete('/api/stacks/' + stackObj._id)
            .then(res => {
                console.log("before", storedStacks);
                console.log(res.data);
                storedStacks = storedStacks.filter(function(ele){
                    return ele._id !== res.data;
                    });
                console.log("after", storedStacks);
                return res.data;
            });
        };
    return obj;
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
