'use strict';

/**
 * Contrôleur associé à la page d'accueil qui contient la liste des comptes de l'utilisateur
 */
angular.module('banquesqliAngular01App')
  .controller('HomeCtrl', function ($scope, $rootScope, AccountsUser, FrontSession) {

  		$scope.validationMsg = '';
        $scope.total = '';

	  	// On regarde s'il y a un message à afficher
	  	if (FrontSession.messageToConsume()) {
				$scope.validationMsg = FrontSession.getMessageToConsume();
	  	}

	  	// Liste des comptes bancaires de l'utilisateur
	  	$scope.comptes = AccountsUser.query(
            {login: $rootScope.getLogin()},
            function(data) {
                $scope.total = 0;
                angular.forEach($scope.comptes, function(value, key) {
                    $scope.total += value.balance;
                });
            }
        );

	  	$scope.isNotBlank = function() {
	  		return $scope.validationMsg !== '';
	  	};

  });
