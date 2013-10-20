'use strict';

// Regex : uniquement des chiffres
var INTEGER_REGEXP = /^\d*$/;

/*
 * Directive de validation d'un champ ne devant contenir que des chiffres
 */
app.directive('onlyDigits', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                if (isEmpty(viewValue) || INTEGER_REGEXP.test(viewValue)) {
                    // it is valid
                    ctrl.$setValidity('onlyDigits', true);
                } else {
                    // it is invalid, return undefined (no model update)
                    ctrl.$setValidity('onlyDigits', false);
                }
                return viewValue;
            });
        }
    };
});