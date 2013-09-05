'use strict';

angular.module('banquesqliAngular01App')
  .controller('TransferCtrl', function ($scope, $rootScope, AccountsUser, Operations, Accounts, $location, AccountsNumber) {

  	// Données du formulaire
  	$scope.fromAccount = '';
  	$scope.toAccount = '';
  	$scope.amount = 0;
  	$scope.comment = '';
		
		$scope.validationMsg = '';

		/* Tests de l'animation */
		$scope.do = function() {
			$scope.validationMsg = 'message';
		}
		$scope.undo = function() {
			$scope.validationMsg = '';
		}
		
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
			
			// --- 1) 'Moins' dans le premier compte
			
			// Sauvegarde de l'opération
			var operationMoins = new Operations({
				accountNumber: $scope.fromAccount,
				amount: -$scope.amount,
				reason: $scope.comment,
				date: new Date().getTime()
			});
			operationMoins.$save();
			
			// Récupération et mise à jour du solde du compte 'From'
			var compteFrom = AccountsNumber.get(
				{number: $scope.fromAccount},
				function(value, responseHeaders) {
					var newBalance = compteFrom.balance - $scope.amount;
					saveNewBalanceForAccount(compteFrom._id, newBalance);
				});
			
			// --- 2) 'Plus' pour le second compte + recalcul du solde

			// Sauvegarde de l'opération
			var operationPlus = new Operations({
				accountNumber: $scope.toAccount,
				amount: $scope.amount,
				reason: $scope.comment,
				date: new Date().getTime()
			});
			operationPlus.$save();
			
			// Récupération et mise à jour du solde du compte 'To'
			var compteTo = AccountsNumber.get(
				{number: $scope.toAccount},
				function(value, responseHeaders) {
					var newBalance = compteTo.balance + $scope.amount;
					saveNewBalanceForAccount(compteTo._id, newBalance);
				});
			
			$scope.validationMsg = 'Virement effectué';
		};

		var saveNewBalanceForAccount = function(idAccount, newBalance) {
			var compteToSave = new Accounts({
				balance: newBalance
			});
			compteToSave.$update({id: idAccount});
		};
		
  });
