'use strict';

angular.module('banquesqliAngular01App')

.directive('focusMe', function ($timeout, $parse) {
    return {
        link: function (scope, element, attrs) {
            var model = $parse(attrs.focusMe);
            scope.$watch(model, function (value) {
                element[0].focus();
            });
        }
    };
});