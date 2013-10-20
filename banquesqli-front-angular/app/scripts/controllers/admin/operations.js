'use strict';

/**
 * Administration
 * Contrôleur associé à la liste des opérations
 */
app.controller('AdminOperationsCtrl', function ($scope, $location, Operations, FrontSession) {

  	$scope.operations = Operations.query(
      {},
      function() {
        // Tri décroissant sur la date
        $scope.operations.sort(function(op1, op2) {
          return (op1.date > op2.date) ? -1 : ((op1.date < op2.date) ? 1 : 0);
        });
      });

    /**
     * Redirection vers le formulaire de détail d'une opération
     */
    $scope.seeOperationDetail = function(idOperation) {

      var operation = $scope.operations.filter(function(op) {
        return op._id == idOperation;
      })[0];

      // Stockage de l'opération dans un service partagé
      FrontSession.setOperation(operation);

      // Redirection vers la vue de détail de l'opération
      $location.path('/admin/operation/' + idOperation);
    };

    /**
     * Suppression d'une opération
     */
    $scope.deleteOperation = function(idOperation) {
      // Non prévu dans le backend...
    };

  });