'use strict';

/**
 * Service qui gère l'accès au token de sécurité
 */
angular.module('banquesqliAngular01App')

  .factory('TokenHandler', ['SessionStorageHandler', function(SessionStorageHandler) {

    var tokenHandler = {};
    var token = 'none';
   
    tokenHandler.set = function(newToken) {
      token = newToken;
    };
   
    tokenHandler.get = function() {
      return token;
    };

    tokenHandler.isSet = function() {
      return token != null && token !== 'none';
    };

    /*
     * Si F5, on perd le token de ce service fixé au login.
     * On essaye alors de récupérer celui stocké dans la session du navigateur
     */
    if (tokenHandler.get() == "none" && SessionStorageHandler.isSet('token')) {
      tokenHandler.set(SessionStorageHandler.get('token'));
    }
   
    return tokenHandler;

  }]);