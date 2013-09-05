'use strict';

angular.module('banquesqliAngular01App')
  .controller('LoginCtrl', function ($scope, $rootScope, Login, $location) {

    // Données du formulaire
  	$scope.login = '1234';
  	$scope.password = 'password';

  	$scope.error = '';
    $scope.hasError = false;
    
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
            $scope.hasError = true;
						$scope.error = 'Login ou mot de passe incorrect';
					}
  			},
  			// Error
  			function(httpResponse) {
          $scope.hasError = true;
					$scope.error = 'Erreur réseau';
  			});
  	};

  	var redirectToHome = function() {
  		$location.path('/');
  	};

  });
