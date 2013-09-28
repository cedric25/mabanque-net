'use strict';

/**
 * Contrôleur associé à la page de login
 */
angular.module('banquesqliAngular01App')
    .controller('LoginCtrl', function ($scope, $rootScope, Login, $location, FrontSession, Users) {
        
      $scope.message = '';

      // Données du formulaire
      $scope.user = {
        login: '1234',
        password: 'password'
      };

    	$scope.error = FrontSession.getMessageForLoginForm();
      
    	$scope.doLogin = function() {
        var loginResponse = Login.login(
    			// Data
    			{ login: $scope.user.login, password: $scope.user.password },
    			// Success
    			function(value, responseHeaders) {
    				if (value.authenticated) {
              $rootScope.setLoggedUser(value);
    					redirectToHome();
    				}
    				else {
  						$scope.error = 'Login ou mot de passe incorrect';
  					}
    			},
    			// Error
    			function(httpResponse) {
  					$scope.error = 'Erreur réseau';
    			});
    	};

    	var redirectToHome = function() {
    		$location.path('/');
        };

  });
