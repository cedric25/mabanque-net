'use strict';

var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$/;

angular.module('banquesqliAngular01App')

.directive('amount', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                if (isEmpty(viewValue) || FLOAT_REGEXP.test(viewValue)) {
                    // it is valid
                    ctrl.$setValidity('amount', true);
                } else {
                    // it is invalid, return undefined (no model update)
                    ctrl.$setValidity('amount', false);
                }
                return viewValue;
            });
        }
    };
});