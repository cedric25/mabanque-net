'use strict';

/**
 * Administration
 * Contrôleur associé à la liste des comptes
 */
angular.module('banquesqliAngular01App')
  .controller('AdminAccountsCtrl', function ($scope, Accounts) {

  	$scope.validationMsg = '';

  	$scope.accounts = Accounts.query();

  	$scope.deleteAccount = function(account) {

  		Accounts.delete(
  			{'id': account._id},
  			function (data) {
          // Message d'information
          $scope.validationMsg = 'Le compte "' + account.name + '" a été supprimé.';
          // Rechargement de la liste des comptes
  				$scope.accounts = Accounts.query();
  			});
  	};

  });