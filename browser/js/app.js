'use strict';
window.app = angular.module('FullstackGeneratedApp', ['fsaPreBuilt', 'ui.router', 'ui.bootstrap', 'ngAnimate', 'ngMaterial', 'ngMessages']);

app.config(function ($urlRouterProvider, $locationProvider, $mdThemingProvider) {

    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
    // Trigger page refresh when accessing an OAuth route
    $urlRouterProvider.when('/auth/:provider', function () {
        window.location.reload();
    });

    var customPrimary = {
        '50': '#03A9F3',
        '100': '#d3dfe8',
        '200': '#c2d3df',
        '300': '#b1c7d6',
        '400': '#a1bbce',
        '500': '90Afc5',
        '600': '#7fa3bc',
        '700': '#6e97b3',
        '800': '#5e8bab',
        '900': '#527e9d',
        'A100': '#f4f7fa',
        'A200': '#ffffff',
        'A400': '#ffffff',
        'A700': '#49708c'
    };
    $mdThemingProvider
        .definePalette('customPrimary',
                        customPrimary);

    var customAccent = {
        '50': '#03A9F3',
        '100': '#d3dfe8',
        '200': '#c2d3df',
        '300': '#b1c7d6',
        '400': '#a1bbce',
        '500': '90Afc5',
        '600': '#7fa3bc',
        '700': '#6e97b3',
        '800': '#5e8bab',
        '900': '#527e9d',
        'A100': '#f4f7fa',
        'A200': '#ffffff',
        'A400': '#ffffff',
        'A700': '#49708c'
    };
    $mdThemingProvider
        .definePalette('customAccent',
                        customAccent);

    var customWarn = {
        '50': '#03A9F3',
        '100': '#d3dfe8',
        '200': '#c2d3df',
        '300': '#b1c7d6',
        '400': '#a1bbce',
        '500': '90Afc5',
        '600': '#7fa3bc',
        '700': '#6e97b3',
        '800': '#5e8bab',
        '900': '#527e9d',
        'A100': '#f4f7fa',
        'A200': '#ffffff',
        'A400': '#ffffff',
        'A700': '#49708c'
    };
    $mdThemingProvider
        .definePalette('customWarn',
                        customWarn);

    var customBackground = {
        '50': '#FFFFFF',
        '100': '#FFFFFF',
        '200': '#FFFFFF',
        '300': '#FFFFFF',
        '400': '#FFFFFF',
        '500': '#FFFFFF',
        '600': '#FFFFFF',
        '700': '#FFFFFF',
        '800': '#FFFFFF',
        '900': '#FFFFFF',
        'A100': '#FFFFFF',
        'A200': '#FFFFFF',
        'A400': '#FFFFFF',
        'A700': '#FFFFFF'
    };
    $mdThemingProvider
        .definePalette('customBackground',
                        customBackground);

   $mdThemingProvider.theme('default')
       .primaryPalette('customPrimary')
       .accentPalette('customAccent')
       .warnPalette('customWarn')
       .backgroundPalette('customBackground');
});

// This app.run is for controlling access to specific states.
app.run(function ($rootScope, AuthService, $state, $location) {

    AuthService.getLoggedInUser().then(function(user) {
        $rootScope.user = user;
    });

    // The given state requires an authenticated user.
    var destinationStateRequiresAuth = function (state) {
        return state.data && state.data.authenticate;
    };

    // $stateChangeStart is an event fired
    // whenever the process of changing a state begins.
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

        if (!destinationStateRequiresAuth(toState)) {
            // The destination state does not require authentication
            // Short circuit with return.
            return;
        }

        if (AuthService.isAuthenticated()) {
            // The user is authenticated.
            // Short circuit with return.
            return;
        }

        // Cancel navigating to new state.
        event.preventDefault();

        AuthService.getLoggedInUser().then(function (user) {
            console.log('user inside the $stateChangeStart event: ', user)
            // If a user is retrieved, then renavigate to the destination
            // (the second time, AuthService.isAuthenticated() will work)
            // otherwise, if no user is logged in, go to "login" state.
            if (user) {
                $rootScope.user = user;
                $rootScope.userId = user._id;
                $state.go(toState.name, toParams);
            } else {
                $state.go('login');
            }
        });

    });

    $rootScope.location = $location;
});
