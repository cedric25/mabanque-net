'use strict';

/**
 * Service de gestion des messages de validation et d'erreur
 */
angular.module('banquesqliAngular01App')
    .service('Notifications', function () {

        // private
        var greenMessage = '';
        var redMessage = '';
        
        var keepMessage = false;

        // public
        return {
            
            'hasGreenMessage': function() {
                return greenMessage !== '';
            },
            'setGreenMessage': function (msg, keepMsg) {
                redMessage = '';
                greenMessage = msg;
                if (keepMsg) {
                    keepMessage = keepMsg;
                }
            },
            'getGreenMessage': function() {
                return greenMessage;
            },
            
            'hasRedMessage': function() {
                return redMessage !== '';
            },
            'setRedMessage': function (msg, keepMsg) {
                greenMessage = '';
                redMessage = msg;
                if (keepMsg) {
                    keepMessage = keepMsg;
                }
            },
            'getRedMessage': function() {
                return redMessage;
            },
            
            'clear': function() {
                greenMessage = '';
                redMessage = '';
            }
        }

    });
