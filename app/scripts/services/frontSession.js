'use strict';

angular.module('banquesqliAngular01App')
    .service('FrontSession', function () {

        // private
        var operation = {};
        var messageForLoginForm = '';
        var messageToConsume = '';

        // public
        return {

            'getOperation': function () {
                return operation;
            },
            'setOperation': function(value) {
                operation = value;
            },
            
            'getMessageForLoginForm': function () {
                return messageForLoginForm;
            },
            'setMessageForLoginForm': function(value) {
                messageForLoginForm = value;
            },

            'messageToConsume': function() {
                return messageToConsume !== '';
            },
            'getMessageToConsume': function () {
                var msg = messageToConsume;
                this.clearMessageToConsume();
                return msg;
            },
            'setMessageToConsume': function(value) {
                messageToConsume = value;
            },
            'clearMessageToConsume': function() {
                messageToConsume = '';
            }
        }

    });