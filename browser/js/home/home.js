app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/home/:id',
        templateUrl: 'js/home/home.html',
        controller: 'homeCtrl',
        resolve: {
            stacks: function($http, $stateParams) {
                return $http.get('/api/stacks?userId='+ $stateParams.id)
                .then(response => response.data);
            }
        }
    });
});

app.controller('homeCtrl', function ($scope, AuthService, $state, stacks, SidebarFactory) {
    $scope.stacks = stacks;
    SidebarFactory.stacks = stacks;
});
