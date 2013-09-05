'use strict';

angular.module('banquesqliAngular01App')

  /**
   * Controleur parent
   * (Seul controleur à manipuler la session)
   */
  .controller('RootController', function ($scope, $rootScope, UserLogin, $location, AccountsUser, TokenHandler) {

    // Liste des comptes de l'utilisateur connecté
    // Chargée une seule fois car utile de partout
    $rootScope.comptes = [];

    $rootScope.listMsgs = [];

    /** @return true si un utilisateur est connecté (login et token présent en session) */
  	$rootScope.isLogged = function() {
      return $rootScope.getLogin() != null && TokenHandler.get() != null;
    }

    /** @return true si l'utilisateur connecté est admin */
    $rootScope.isAdmin = function() {
      return sessionStorage.getItem('isAdmin') != null
        && sessionStorage.getItem('isAdmin') == 'true';
    }

    /** Suppression des données en session (logout d'un user) */
    $rootScope.clearUser = function() {
      // Clear des infos en session
      sessionStorage.clear();
    };

    /** @return login en session */
    $rootScope.getLogin = function() {
      return sessionStorage.getItem('login');
    };

    /** @return token en session */
    $rootScope.getFirstName = function() {
      return sessionStorage.getItem('firstName');
    };

    /** Définit l'utilisateur connecté avec un retour positif de la méthode de login */
    $rootScope.setLoggedUser = function(loginResult) {

      // Stockage du login et du token en session
      sessionStorage.setItem('login', loginResult.login);
      sessionStorage.setItem('token', loginResult.token);
      TokenHandler.set(loginResult.token);

      // Infos de l'utilisateur connecté
      var loggedUser = UserLogin.get(
        {login: loginResult.login},
        function(data) {
          sessionStorage.setItem('firstName', loggedUser.firstName);
          if (loggedUser.admin) {
            sessionStorage.setItem('isAdmin', 'true');
          }
        });
    };

    /** Design adaptatif en fonction de la présence ou non du menu de gauche */
    $rootScope.getContentCssClass = function() {
      if ($rootScope.isLogged()) {
        return 'span9';
      }
      else {
        return '';
      }
    };
		
		$rootScope.checkAuth = function(response) {
			// Si 'authenticated' = false (timeout, mauvais token...)
			/*if (response.authenticated != undefined && !response.authenticated) {
        $rootScope.clearUser();
				$rootScope.addMessage('Authentification perdue');
				$rootScope.redirectToLogin();
				return false;
			}
			return true;*/
		};

    /**
     * Ajoute un message d'information au dessus du formulaire de login
     */
    $rootScope.addMessage = function(msg) {
      $rootScope.listMsgs.push( {msg: msg} );
    };
		
		/** Redirection vers la page de login */
		$rootScope.redirectToLogin = function() {
			$location.path('/login');
		};

  });