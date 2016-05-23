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


app.factory('StackBuilderFactory', function($http, $rootScope, TestBuilderFactory) {
    var obj = {};
        var storedStacks = [];
        obj.getStacks = function(){
            return storedStacks;
        };
        obj.getUserStacks = function(user){
            return $http.get('/api/stacks?userId=' + user._id)
            .then(response => {
                angular.copy(response.data, storedStacks);
                return storedStacks;
            });
        };

        obj.create = function(stackObj) {
            console.log(stackObj);
            console.log(stackObj.tests, typeof stackObj.tests,'****');
            let newTests = stackObj.tests.map(test => TestBuilderFactory.create(test));
            return Promise.all(newTests)
            .then(savedTests => stackObj.tests = savedTests)
            .then( () => $http.post('/api/stacks', stackObj))
            .then(res => {
                $rootScope.$emit('createstack', res.data);
                return res.data;
            });
        };
        obj.delete = function(stackObj) {
            return $http.delete('/api/stacks/' + stackObj._id)
            .then(res => {
                storedStacks = storedStacks.filter(function(ele){
                    return ele._id !== res.data;
                });
                $rootScope.$emit('deletestack', res.data);
                return res.data;
            });
        };
    return obj;
});

app.controller('StackBuilderCtrl', function($scope, $state, $log, tests, StackBuilderFactory, $rootScope, TestBuilderFactory) {

    $scope.toggle = false;
    $scope.setToggle = function(){
        $scope.toggle = !$scope.toggle;
        $scope.$evalAsync();
    };

    $scope.tests = tests.filter(function(test){
        return !test.stack;
    });
    $scope.stack = {};
    $scope.stack.user = $rootScope.user;
    $scope.stack.userId = $rootScope.user._id;
    $scope.stack.tests = [];


    $scope.intermediary = function(){
        $scope.setToggle();
        window.setTimeout($scope.submitStack, 800);
    };

    $scope.submitStack = function () {
        StackBuilderFactory.create($scope.stack)
        .then(stack => $state.go('stackView', {stackId: stack._id}))
        .catch($log.error);
    };
    $scope.addToStack = function (test) {
        $scope.stack.tests.push(test);
        $scope.$evalAsync();
    };
    $scope.removeFromStack = function (obj) {
        console.log("REMOTE THIS: ", obj);
        $scope.stack.tests = $scope.stack.tests.filter(function(el){
            return el !== obj;
        });
        $scope.$evalAsync();
    };
    $scope.onDropComplete = function (index, obj, evt) {
        var otherObj = $scope.stack.tests[index];
        var otherIndex = $scope.stack.tests.indexOf(obj);
        $scope.stack.tests[index] = obj;
        $scope.stack.tests[otherIndex] = otherObj;
    };
});
