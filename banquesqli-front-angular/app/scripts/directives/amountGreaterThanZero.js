'use strict';

var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$/;
var FLOAT_SUP_ZERO_REGEXP = /^[1-9]+\d*((\.|\,)\d+)?$/;

app.directive('amountGreaterThanZero', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                
                if (isEmpty(viewValue)) {
                    // L'erreur "Champ obligatoire" apparaîtra si le champ est 'required'
                    ctrl.$setValidity('amount', true);
                    ctrl.$setValidity('amountGreaterThanZero', true);
                }
                else if (!FLOAT_REGEXP.test(viewValue)) {
                    
                    // Montant invalide
                    ctrl.$setValidity('amount', false);
                    
                    // On n'affiche pas l'erreur "Le montant doit être strictement positif"
                    ctrl.$setValidity('amountGreaterThanZero', true);
                }
                else {
                    // Montant valide
                    ctrl.$setValidity('amount', true);
                    
                    if (FLOAT_SUP_ZERO_REGEXP.test(viewValue)) {
                        // Montant bien supérieur à 0
                        ctrl.$setValidity('amountGreaterThanZero', true);
                    } else {
                        // Montant inférieur à 0
                        ctrl.$setValidity('amountGreaterThanZero', false);
                    }
                }
                return viewValue;
            });
        }
    };
});