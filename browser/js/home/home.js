app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/home', //TEST :id and trailing slash
        templateUrl: 'js/home/home.html',
        controller: 'homeCtrl',
        resolve: {
            user: function(AuthService) {
                console.log("Getting user");
                return AuthService.getLoggedInUser();
            },
            stacks: function($http, user) {
                console.log("Getting stack", user);
                return $http.get('/api/stacks?userId=' + user._id) //TEST $stateParams.id
                .then(response => response.data);
            }
        }
    });
});

app.controller('homeCtrl', function ($scope, $state, user, stacks, SidebarFactory, SignupFactory, $rootScope) {
    $scope.user = user;
    $scope.stacks = stacks;

});
