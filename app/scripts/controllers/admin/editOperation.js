'use strict';

angular.module('banquesqliAngular01App')
  .controller('AdminEditOperationCtrl', function ($scope, $routeParams, Operations, FrontSession) {

  	var idOperation = $routeParams.id; // dans l'URl
  	$scope.operation = FrontSession.getOperation(); // Dans le service partagé
		
		$scope.validationMsg = '';
		
		/** saveOperation() */
		$scope.saveOperation = function() {

			var operation = new Operations({
				reason: $scope.operation.reason,
				amount: $scope.operation.amount,
				accountNumber: $scope.operation.accountNumber
			});

			operation.$update({'id': $scope.operation._id});

			$scope.validationMsg = 'Opération sauvegardée';
		};

  });