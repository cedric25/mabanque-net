'use strict';

/**
 * Contrôleur associé à la barre du haut
 */
app.controller('NavbartopController', function ($scope, $rootScope) {

  	/**
  	 * Déconnexion
  	 */
  	$scope.logout = function() {
        $rootScope.clearUser();
  		$rootScope.redirectToLogin();
  	};

});