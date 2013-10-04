'use strict';

/**
 * Contrôleur parent de tous les autres contrôleurs.
 * Toutes ces méthodes sont accessibles depuis les autres contrôleurs.
 */
angular.module('banquesqliAngular01App')

  .controller('RootController',
  function ($scope, $rootScope, UserLogin, $location, AccountsUser, TokenHandler, SessionStorageHandler, Notifications) {
      
    /* METHODES UTILITAIRES */

    $rootScope.hasGreenMessage = function () {
        return Notifications.hasGreenMessage();
    };
    $rootScope.getGreenMessage = function () {
        return Notifications.getGreenMessage();
    };
    $rootScope.hasRedMessage = function () {
        return Notifications.hasRedMessage();
    };
    $rootScope.getRedMessage = function () {
        return Notifications.getRedMessage();
    };

    /** @return true si un utilisateur est connecté (login et token présent en session) */
    $rootScope.isLogged = function () {
        return $rootScope.getLogin() != null && TokenHandler.get() != null;
    }

    /** @return true si l'utilisateur connecté est admin */
    $rootScope.isAdmin = function () {
        return SessionStorageHandler.get('isAdmin') != null && SessionStorageHandler.get('isAdmin') == 'true';
    }

    /** Suppression des données en session (logout d'un user) */
    $rootScope.clearUser = function () {
        // Clear des infos en session
        SessionStorageHandler.clear();
    };

    /** @return login en session */
    $rootScope.getLogin = function () {
        return SessionStorageHandler.get('login');
    };

    /** @return token en session */
    $rootScope.getFirstName = function () {
        return SessionStorageHandler.get('firstName');
    };

    /** Définit l'utilisateur connecté avec un retour positif de la méthode de login */
    $rootScope.setLoggedUser = function (loginResult) {

        // Stockage du login et du token en session
        SessionStorageHandler.set('login', loginResult.login);
        SessionStorageHandler.set('token', loginResult.token);
        TokenHandler.set(loginResult.token);

        // Infos de l'utilisateur connecté
        var loggedUser = UserLogin.get({
            login: loginResult.login
        }, function (data) {
            SessionStorageHandler.set('firstName', loggedUser.firstName);
            if (loggedUser.admin) {
                SessionStorageHandler.set('isAdmin', 'true');
            }
        });
    };

    /** Design adaptatif en fonction de la présence ou non du menu de gauche */
    $rootScope.getContentCssClass = function () {
        if ($rootScope.isLogged()) {
            return 'span9';
        } else {
            return '';
        }
    };

    /** Redirection vers la page de login */
    $rootScope.redirectToLogin = function () {
        $location.path('/login');
    };

    /** Redirection vers la home */
    $rootScope.redirectToHome = function () {
        $location.path('/');
    };

    /**
     * Affichage des montants positifs en vert, des montants négatifs en rouge
     */
    $rootScope.cssClass = function (value) {
        if (value > 0) {
            return 'green';
        } else if (value < 0) {
            return 'red';
        }
    };
    
    // Envoi d'un message, à destination du contrôleur du menu de gauche qui est prévu pour le traiter
    $rootScope.reloadLeftMenu = function() {
        $rootScope.$broadcast('reloadLeftMenu');
    };

  });