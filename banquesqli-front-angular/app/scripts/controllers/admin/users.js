'use strict';

/**
 * Administration
 * Contrôleur associé à la liste des utilisateurs
 */
app.controller('AdminUsersCtrl', function ($scope, $rootScope, Users, Notifications) {

  	$scope.validationMsg = '';

  	$scope.users = Users.query();

  	$scope.deleteUser = function(user) {
        
        // Un utilisateur ne peut pas se supprimer lui-même
        if (user.login == $rootScope.getLogin()) {
            //alert('Vous ne pouvez pas vous supprimer.');
            Notifications.setRedMessage('Vous ne pouvez pas vous supprimer.');
        }
        else {
            Users.delete(
                {'id': user._id},
                function (data) {
                    // Message de confirmation
                    $scope.validationMsg =
                        'L\'utilisateur "' + user.firstName + ' ' + user.lastName + '" a été supprimé.';
                    // Rechargement de la liste
                    $scope.users = Users.query();
                });
        }
  	};

  });