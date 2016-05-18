'use strict';

app.directive('validatorEditor', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/validatorEditor/validatorEditor.html',
        controller: 'ValidatorEditorCtrl'
    };

});

app.factory('ValidatorEditorFactory', function() {
    return {};
});

app.controller('ValidatorEditorCtrl', function($scope, ValidatorEditorFactory) {


});
