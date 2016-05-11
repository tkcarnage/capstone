app.config(function ($stateProvider) {
    $stateProvider.state('stackView', {
        url: '/:userId/stackView/:stackId',
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
    return { };
});

app.controller('StackViewCtrl', function($scope, $state, $log, stack, StackViewFactory) {
    $scope.stack = stack;
});
