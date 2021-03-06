'use strict';

/**
 * Service qui sert d'interface pour manipuler les valeurs dans la zone sessionStorage du navigateur
 */
app.factory('SessionStorageHandler', function() {

    return {

        isSet: function (propertyName) {
            if (sessionStorage.getItem(propertyName) !== 'undefined') {
                return true;
            }
            return false;
        },

        get: function (propertyName) {
            if (this.isSet(propertyName)) {
                return sessionStorage.getItem(propertyName);
            }
            return null;
        },

        set: function (propertyName, value) {
            sessionStorage.setItem(propertyName, value);
        },

        clear: function () {
            sessionStorage.clear();
        }

    };

});