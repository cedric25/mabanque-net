'use strict';

angular.module('banquesqliAngular01App')
  .controller('LoginCtrl', function ($scope, $rootScope, Login, $location, FrontSession) {

    // Données du formulaire
  	$scope.login = '1234';
  	$scope.password = 'password';

  	$scope.error = FrontSession.getMessageForLoginForm();
    
  	$scope.doLogin = function() {
  		var loginResponse = Login.login(
  			// Data
  			{ login: $scope.login, password: $scope.password },
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
