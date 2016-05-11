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
        '50': '#e4ebf1',
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
        '50': '#091318',
        '100': '#10222a',
        '200': '#17303d',
        '300': '#1e3f4f',
        '400': '#254e62',
        '500': '#2c5c74',
        '600': '#3a7a9a',
        '700': '#4188ac',
        '800': '#4b96bb',
        '900': '#5ea1c2',
        'A100': '#3a7a9a',
        'A200': '336B87',
        'A400': '#2c5c74',
        'A700': '#70acc9'
    };
    $mdThemingProvider
        .definePalette('customAccent',
                        customAccent);

    var customWarn = {
        '50': '#c86b54',
        '100': '#c25a40',
        '200': '#b05039',
        '300': '#9d4832',
        '400': '#893f2c',
        '500': '763626',
        '600': '#632d20',
        '700': '#4f241a',
        '800': '#3c1c13',
        '900': '#29130d',
        'A100': '#ce7c67',
        'A200': '#d48c7a',
        'A400': '#da9d8e',
        'A700': '#160a07'
    };
    $mdThemingProvider
        .definePalette('customWarn',
                        customWarn);

    var customBackground = {
        '50': '#647577',
        '100': '#596769',
        '200': '#4d5a5c',
        '300': '#414c4e',
        '400': '#363f40',
        '500': '#2A3132',
        '600': '#1e2324',
        '700': '#131616',
        '800': '#070808',
        '900': '#000000',
        'A100': '#708285',
        'A200': '#7d8f92',
        'A400': '#8b9b9d',
        'A700': '#000000'
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
app.run(function ($rootScope, AuthService, $state) {
    console.log('.run is running');

    AuthService.getLoggedInUser().then(function(user) {
        $rootScope.user = user;
    })

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

});
