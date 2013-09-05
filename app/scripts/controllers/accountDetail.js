'use strict';

angular.module('banquesqliAngular01App')
  .controller('AccountDetailCtrl', function ($scope, $routeParams, AccountsNumber, OperationsAccount) {

  	var accountNumber = $routeParams.number;

    $scope.compte = AccountsNumber.get({number: accountNumber});
    
  	$scope.operations = OperationsAccount.query(
  		{number: accountNumber},
  		function() {
  			// Tri du tableau, de l'opération la plus récente à la moins récente
  			$scope.operations.sort(function(op1, op2) {
  				return (op1.date > op2.date) ? -1 : ((op2.date > op1.date) ? 1 : 0);
  			});
  		});

    /**
     * Affichage des montants positifs en vert, des montants négatifs en rouge
     */
    $scope.cssClass = function(value) {
      if (value > 0) {
        return 'green';
      }
      else if (value < 0) {
        return 'red';
      }
    };

  });
