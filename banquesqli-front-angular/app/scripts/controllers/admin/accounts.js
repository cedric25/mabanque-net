'use strict';

/**
 * Administration
 * Contrôleur associé à la liste des comptes
 */
app.controller('AdminAccountsCtrl', function ($scope, $rootScope, Accounts, Notifications) {

    $scope.validationMsg = '';

    $scope.accounts = Accounts.query();

    $scope.deleteAccount = function (account) {

        Accounts.delete({
            'id': account._id
        }, function (data) {
            // Message d'information
            Notifications.setGreenMessage('Le compte "' + account.name + '" a été supprimé.', false);
            
            // Rechargement de la liste des comptes
            $scope.accounts = Accounts.query();
            
            // Demande de rechargement de la liste des comptes dans le menu de gauche
            $rootScope.reloadLeftMenu();
        });
    };

});