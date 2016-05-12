app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state, $rootScope) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function (user) {
            $rootScope.user = user;
            console.log("This is user within AuthService login");
            $scope.$evalAsync();
            $state.go('home');  //TEST {id: user._id}
        }).catch(function (error) {
            $scope.error = 'Invalid login credentials.';
        });

    };

});
