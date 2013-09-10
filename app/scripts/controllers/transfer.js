'use strict';

angular.module('banquesqliAngular01App')
  .controller('TransferCtrl',
  	['$scope', '$rootScope', 'AccountsUser', 'Operations', 'Accounts', 'AccountsNumber', 'FrontSession', '$q',
  	function ($scope, $rootScope, AccountsUser, Operations, Accounts, AccountsNumber, FrontSession, $q) {

  	// Données du formulaire
  	$scope.fromAccount = '';
  	$scope.toAccount = '';
  	$scope.amount = 0;
  	$scope.comment = '';
		
		$scope.validationMsg = '';

		/* Tests de l'animation */
		/*$scope.do = function() {
			$scope.validationMsg = 'message';
		}
		$scope.undo = function() {
			$scope.validationMsg = '';
		}*/
		
		/**
		 * Liste des comptes bancaires de l'utilisateur
     * + Mise à jour des valeurs pré-sélectionnées dans les listes déroulantes
     */
		var initFields = function() {

			// Liste des comptes bancaires de l'utilisateur
			$scope.comptes = AccountsUser.query(
	    	{login: $rootScope.getLogin()},
	    	function() {
					// Pré-sélection des comptes dans les 2 listes déroulantes
					if ($scope.comptes.length > 0) {
						$scope.fromAccount = $scope.comptes[0].number;
					}
					if ($scope.comptes.length > 1) {
						$scope.toAccount = $scope.comptes[1].number;
					}
					else if ($scope.comptes.length > 0) {
						$scope.toAccount = $scope.comptes[0].number;
					}
	    	});

			$scope.amount = 0;
			$scope.comment = '';
		};
    
		// Liste des comptes bancaires de l'utilisateur
    // + Mise à jour des valeurs pré-sélectionnées dans les listes déroulantes
  	initFields();
		
		/**
		 * Effectue le transfert
		 */
		$scope.doTransfer = function() {
			
			$scope.amount = parseFloat($scope.amount);
			$scope.comment = ($scope.comment !== '') ? $scope.comment : '(sans motif)';
			
			// Opération 'Moins' dans le premier compte
			var operationMoins = new Operations({
				accountNumber: $scope.fromAccount,
				amount: -$scope.amount,
				reason: $scope.comment,
				date: new Date().getTime()
			});
			
			// Opération 'Plus' dans le premier compte
			var operationPlus = new Operations({
				accountNumber: $scope.toAccount,
				amount: $scope.amount,
				reason: $scope.comment,
				date: new Date().getTime()
			});

			$q.all([

				// Opération 'Moins' dans le premier compte
				saveOperation(operationMoins),

				// Récupération et mise à jour du solde du compte 'From'
				updateBalance($scope.fromAccount, 'compteFrom'),

				// Opération 'Plus' dans le premier compte
				saveOperation(operationPlus),

				// Récupération et mise à jour du solde du compte 'To'
				updateBalance($scope.toAccount, 'compteTo'),

			]).then(function(data) {

				// Quand tout est fini, redirection vers la liste des comptes
				FrontSession.setMessageToConsume('Virement effectué');
				$rootScope.redirectToHome();

			});
		};

		var saveOperation = function(operation) {
			var d = $q.defer();
			var result = operation.$save({}, function() {
				d.resolve(result);
			});
			return d.promise;
		};

		var updateBalance = function(accountNumber, whichAccount) {
			var d = $q.defer();
			var compte = AccountsNumber.get(
				{number: accountNumber},
				function(value, responseHeaders) {
					var newBalance = 0;
					if (whichAccount === 'compteFrom') {
						newBalance = compte.balance - $scope.amount;
					}
					else if (whichAccount === 'compteTo') {
						newBalance = compte.balance + $scope.amount;
					}
					saveNewBalanceForAccount(compte._id, newBalance, d);
				});
			return d.promise;
		};

		var saveNewBalanceForAccount = function(idAccount, newBalance, d) {
			var compteToSave = new Accounts({
				balance: newBalance
			});
			var result = compteToSave.$update({id: idAccount}, function() {
				d.resolve(result);
			});
		};
		
  }]);
