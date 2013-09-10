'use strict';

angular.module('banquesqliAngular01App')
  .controller('AdminAccountsCtrl', ['$scope', 'Accounts', function ($scope, Accounts) {

  	$scope.validationMsg = '';

  	$scope.accounts = Accounts.query();

  	$scope.deleteAccount = function(account) {

			$scope.validationMsg = 'Le compte "' + account.name + '" a été supprimé.';
  		Accounts.delete(
  			{'id': account._id},
  			function (data) {
  				$scope.accounts = Accounts.query();
  			});
  	};

  }]);