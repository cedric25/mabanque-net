'use strict';

angular.module('banquesqliAngular01App')
  .controller('AdminEditAccountCtrl', function ($scope, $routeParams, Accounts, AccountsNumber) {

  	var accountNumber = $routeParams.number;
		
		$scope.validationMsg = '';
		$scope.title = 'Nouveau compte';
		
		if (accountNumber != null) {
			// Récupération du compte
			$scope.compte = AccountsNumber.get(
				{number: accountNumber},
				function() {
					$scope.title = $scope.compte.name;
				});
		}
		
		/** saveAccount() */
		$scope.saveAccount = function() {

			var isCreation = true;
			if ($scope.compte._id != null) {
				isCreation = false;
			}

			var compte = new Accounts({
				number: $scope.compte.number,
				name: $scope.compte.name,
				ownerLogin: $scope.compte.ownerLogin,
				balance: $scope.compte.balance
			});

			if (isCreation) {
				compte.$save();
			}
			else {
				compte.$update({'id': $scope.compte._id});
			}

			$scope.validationMsg = 'Compte sauvegardé';
		};

  });