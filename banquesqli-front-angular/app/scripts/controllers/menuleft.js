'use strict';

/**
 * Contrôleur associé au menu de gauche
 */
angular.module('banquesqliAngular01App')

.controller('MenuLeftController', function ($scope, $rootScope, AccountsUser, $location) {
    
    $scope.comptes = [];
    
    // Réception d'un message du rootScope qui demande de recharger la liste des comptes
    $rootScope.$on('reloadLeftMenu', function() {
        loadListeComptes();
    });
    
    // Liste des comptes du user connecté
    var loadListeComptes = function() {
        $scope.comptes = AccountsUser.query({
            login: $rootScope.getLogin()
        });
    };
    
    // Liste des comptes bancaires de l'utilisateur
    loadListeComptes();

    var LENGTH_LIKE_START = 10;

    $scope.isActive = function (path, onlyStart) {

        var realPath = $location.path();

        if (onlyStart) {
            if (realPath.length > LENGTH_LIKE_START) {
                realPath = realPath.substr(0, LENGTH_LIKE_START);
            }
            if (path.length > LENGTH_LIKE_START) {
                path = path.substr(0, LENGTH_LIKE_START);
            }
        }

        if (realPath == path) {
            return 'active';
        } else {
            return '';
        }
    };

});