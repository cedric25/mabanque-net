'use strict';

/**
 * Administration
 * Contrôleur associé à la liste des utilisateurs
 */
angular.module('banquesqliAngular01App')
  .controller('AdminUsersCtrl', function ($scope, Users) {

  	$scope.validationMsg = '';

  	$scope.users = Users.query();

  	$scope.deleteUser = function(user) {

  		Users.delete(
  			{'id': user._id},
  			function (data) {
          // Message de confirmation
          $scope.validationMsg = 'L\'utilisateur "' + user.firstName + ' ' + user.lastName + '" a été supprimé.';
          // Rechargement de la liste
  				$scope.users = Users.query();
  			});
  	};

  });