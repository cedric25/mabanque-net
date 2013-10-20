'use strict';

/**
 * Contrôleur associé à la page d'accueil qui contient la liste des comptes de l'utilisateur
 */
app.controller('HomeCtrl', function ($scope, $rootScope, AccountsUser) {

        $scope.total = '';

	  	// Liste des comptes bancaires de l'utilisateur
	  	$scope.comptes = AccountsUser.query(
            {login: $rootScope.getLogin()},
            function(data) {
                $scope.total = 0;
                angular.forEach($scope.comptes, function(value, key) {
                    $scope.total += value.balance;
                });
            }
        );

  });
