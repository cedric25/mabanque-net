'use strict';

/**
 * Contrôleur associé à la barre du haut
 */
angular.module('banquesqliAngular01App')
  .controller('NavbartopController', function ($scope, $rootScope) {

  	/**
  	 * Déconnexion
  	 */
  	$scope.logout = function() {
      $rootScope.clearUser();
  		$rootScope.redirectToLogin();
  	};

  });