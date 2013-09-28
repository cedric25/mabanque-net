'use strict';

/**
 * Administration
 * Contrôleur associé à la création ou à la modification d'un compte
 */
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
				compte.$save({}, function() { $scope.validationMsg = 'Compte créé'; });
			}
			else {
				compte.$update({'id': $scope.compte._id}, function() {
                    $scope.validationMsg = 'Compte sauvegardé';
                });
			}
            
            $scope.compte = {};
		};

  });