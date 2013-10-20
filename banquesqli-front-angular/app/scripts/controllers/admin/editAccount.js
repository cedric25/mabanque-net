'use strict';

/**
 * Administration
 * Contrôleur associé à la création ou à la modification d'un compte
 */
app.controller('AdminEditAccountCtrl', function ($scope, $rootScope, $routeParams, Accounts, AccountsNumber, Users, Notifications, $location) {
    
    var accountNumber = $routeParams.number;

    $scope.title = 'Nouveau compte';
    
    $scope.users = Users.query();

    if (accountNumber != null) {
        // Récupération du compte
        $scope.compte = AccountsNumber.get({
            number: accountNumber
        }, function () {
            $scope.title = $scope.compte.name;
        });
    } else {
        $scope.compte = {
            balance: 0
        };
    }

    /** saveAccount() */
    $scope.saveAccount = function () {

        var isCreation = true;
        if ($scope.compte._id != null) {
            isCreation = false;
        }

        var compte = new Accounts({
            number: $scope.compte.number,
            name: $scope.compte.name,
            ownerLogin: $scope.compte.ownerLogin,
            balance: $scope.compte.balance
        });

        if (isCreation) {
            compte.$save({}, function (data) {
                if (data[0] === 'O' && data[1] === 'K') {
                    Notifications.setGreenMessage('Compte créé', true);
                    // Demande de rechargement de la liste des comptes dans le menu de gauche
                    $rootScope.reloadLeftMenu();
                    $location.path('/admin/accounts');
                } else if (typeof data === 'object' && typeof data.message !== 'undefined') {
                    Notifications.setRedMessage(data.message);
                } else {
                    Notifications.setRedMessage('Erreur serveur');
                }
            });
        } else {
            compte.$update({
                'id': $scope.compte._id
            }, function (data) {
                if (typeof data === 'object' && typeof data._id !== 'undefined') {
                    Notifications.setGreenMessage('Compte sauvegardé', true);
                    $location.path('/admin/accounts');
                } else {
                    Notifications.setRedMessage('Erreur serveur');
                }
            });
        }
    };

});