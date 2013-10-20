'use strict';

/**
 * Administration
 * Contrôleur associé à la modification d'une opération
 */
app.controller('AdminEditOperationCtrl', function ($scope, $routeParams, Operations, FrontSession, Notifications) {

  	$scope.operation = FrontSession.getOperation(); // Dans le service partagé
    // Si F5 ??
    // Stocker aussi en session...
		
		/** saveOperation() */
		$scope.saveOperation = function() {

			var operation = new Operations({
				reason: $scope.operation.reason,
				amount: $scope.operation.amount,
				accountNumber: $scope.operation.accountNumber
			});

			operation.$update({'id': $scope.operation._id}, function() {
        Notifications.setGreenMessage('Opération sauvegardée');
      });
		};

  });