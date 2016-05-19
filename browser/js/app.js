'use strict';
window.app = angular.module('FullstackGeneratedApp', ['fsaPreBuilt', 'ui.router', 'ui.bootstrap', 'ngAnimate', 'ngMaterial', 'ngMessages', 'md.data.table', 'ngDraggable' , 'ui.ace']);

app.config(function ($urlRouterProvider, $locationProvider, $mdThemingProvider) {

    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    // $urlRouterProvider.otherwise('/');
    // Trigger page refresh when accessing an OAuth route
    $urlRouterProvider.when('/auth/:provider', function () {
        window.location.reload();
    });

var customPrimary = {
        '50': '#e4ebf1',
        '100': '#d3dfe8',
        '200': '#c2d3df',
        '300': '#b1c7d6',
        '400': '#a1bbce',
        '500': '#90AFC5',
        '600': '#7fa3bc',
        '700': '#6e97b3',
        '800': '#5e8bab',
        '900': '#527e9d',
        'A100': '#C2C2C2',
        'A200': '#ffffff',
        'A400': '#ffffff',
        'A700': '#49708c'
    };
    $mdThemingProvider
        .definePalette('customPrimary',
                        customPrimary);

    var customAccent = {
        '50': '#32924a',
        '100': '#38a554',
        '200': '#3fb85e',
        '300': '#4ec36b',
        '400': '#61c97b',
        '500': '#74cf8b',
        '600': '#9adcab',
        '700': '#ade3bb',
        '800': '#c0e9cb',
        '900': '#d3f0da',
        'A100': '#9adcab',
        'A200': '87D69B',
        'A400': '#74cf8b',
        'A700': '#e6f6ea'
    };
    $mdThemingProvider
        .definePalette('customAccent',
                        customAccent);

    var customWarn = {
        '50': '#ffe5e5',
        '100': '#ffcccc',
        '200': '#ffb3b3',
        '300': '#ff9999',
        '400': '#ff8080',
        '500': '#ff6666',
        '600': '#ff4c4c',
        '700': '#ff3333',
        '800': '#ff1919',
        '900': '#ff0000',
        'A100': '#ffffff',
        'A200': '#ffffff',
        'A400': '#ffffff',
        'A700': '#e50000'
    };
    $mdThemingProvider
        .definePalette('customWarn',
                        customWarn);

    var customBackground = {
        '50': '#ffffff',
        '100': '#ffffff',
        '200': '#ffffff',
        '300': '#ffffff',
        '400': '#ffffff',
        '500': '#FFFFFF',
        '600': '#f2f2f2',
        '700': '#e6e6e6',
        '800': '#d9d9d9',
        '900': '#cccccc',
        'A100': '#ffffff',
        'A200': '#ffffff',
        'A400': '#ffffff',
        'A700': '#bfbfbf'
    };
    $mdThemingProvider
        .definePalette('customBackground',
                        customBackground);

   $mdThemingProvider.theme('default')
       .primaryPalette('customPrimary', {
            'default' : '500',
            'hue-1' : '50',
            'hue-2' : '200',
            'hue-3' : 'A100'
       })
       .accentPalette('customAccent')
       .warnPalette('customWarn')
       .backgroundPalette('customBackground')

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

    // var d3 = require('path/to/d3.js');

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
