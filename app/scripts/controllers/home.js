'use strict';

angular.module('banquesqliAngular01App')
  .controller('HomeCtrl',
  	['$scope', '$rootScope', 'AccountsUser', 'FrontSession',
  	function ($scope, $rootScope, AccountsUser, FrontSession) {

  		$scope.validationMsg = '';

	  	// On regarde s'il y a un message à afficher
	  	if (FrontSession.messageToConsume()) {
				$scope.validationMsg = FrontSession.getMessageToConsume();
	  	}

	  	// Liste des comptes bancaires de l'utilisateur
	  	$scope.comptes = AccountsUser.query(
	      {login: $rootScope.getLogin()});

	  	$scope.isNotBlank = function() {
	  		return $scope.validationMsg !== '';
	  	};

  }]);
