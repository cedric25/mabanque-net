'use strict';

/**
 * Service de gestion des messages de validation et d'erreur
 * A chaque changement de route, les messages sont vidés
 * Sauf dans le cas où le booléen 'keepMsg' est fixé à 'true'
 * Dans ce cas, le message "survivra" après le premier changement de route
 * Ex: Création d'un user, message d'info et redirection vers la liste : le message doit "survivre" à la redirection
 */
app.service('Notifications', function () {

    // private
    var greenMessage = '';
    var redMessage = '';

    var keepMessage = false;

    // public
    return {

        'hasGreenMessage': function () {
            return greenMessage !== '';
        },
        /**
         * @param msg Message à afficher
         * @param keepMsg Booléen qui indique si le message doit être conservé après un changement de route
         */
        'setGreenMessage': function (msg, keepMsg) {
            redMessage = '';
            greenMessage = msg;
            if (keepMsg) {
                keepMessage = keepMsg;
            }
        },
        'getGreenMessage': function () {
            return greenMessage;
        },

        'hasRedMessage': function () {
            return redMessage !== '';
        },
        'setRedMessage': function (msg, keepMsg) {
            greenMessage = '';
            redMessage = msg;
            if (keepMsg) {
                keepMessage = keepMsg;
            }
        },
        'getRedMessage': function () {
            return redMessage;
        },

        'isKeepMessage': function() {
            return keepMessage;
        },
        'setKeepMessage': function(value) {
            keepMessage = value;
        },
        'clear': function () {
            greenMessage = '';
            redMessage = '';
            keepMessage = false;
        }
    }

});