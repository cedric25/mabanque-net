'use strict';

angular.module('banquesqliAngular01App')
    .service('FrontSession', function () {

        // private
        var operation = {};
        var getOperation = function () {
            return operation;
        };
        var setOperation = function(value) {
            operation = value;
        };

        // public
        return {
            getOperation: getOperation,
            setOperation: setOperation
        };

    });