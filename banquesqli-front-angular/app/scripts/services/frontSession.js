'use strict';

/**
 * Ressources partagées disponibles dans chaque contrôleur
 */
app.service('FrontSession', function () {

    // private
    var operation = {};

    // public
    return {
        'getOperation': function () {
            return operation;
        },
        'setOperation': function(value) {
            operation = value;
        }
    }

});