'use strict';

/**
 * Configuration de l'application
 */
var app = angular.module('banquesqliAngular01App', ['ngRoute', 'ngResource', 'ngAnimate', 'ui.bootstrap']);

app.constant('constants', {
    CONTEXTPATH: 'http://localhost:3000/'
});

app.config(function ($routeProvider, $httpProvider) {
    
    // Ensemble des routes
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/transfer', {
        templateUrl: 'views/transfer.html',
        controller: 'TransferCtrl'
      })
      .when('/account/detail/:number', {
        templateUrl: 'views/accountDetail.html',
        controller: 'AccountDetailCtrl'
      })
    
      // Admin
      .when('/admin/users', {
        templateUrl: 'views/admin/users.html',
        controller: 'AdminUsersCtrl'
      })
      .when('/admin/user/:login', {
        templateUrl: 'views/admin/editUser.html',
        controller: 'AdminEditUserCtrl'
      })
      .when('/admin/accounts', {
        templateUrl: 'views/admin/accounts.html',
        controller: 'AdminAccountsCtrl'
      })
      .when('/admin/account/:number', {
        templateUrl: 'views/admin/editAccount.html',
        controller: 'AdminEditAccountCtrl'
      })
      .when('/admin/operations', {
        templateUrl: 'views/admin/operations.html',
        controller: 'AdminOperationsCtrl'
      })
      .when('/admin/operation/:id', {
        templateUrl: 'views/admin/editOperation.html',
        controller: 'AdminEditOperationCtrl'
      })
    
      // Default
      .otherwise({
        redirectTo: '/'
      });
    
      // Ajout du token de sécurité à toutes les requêtes sortantes
      $httpProvider.interceptors.push('AddTokenToRequestInterceptor');
    
      // Vérification de la réponse des requêtes entrantes,
      // redirection vers la page de login si le serveur renvoie 'authenticated' = false
      $httpProvider.interceptors.push('CheckAuthWithinResponseInterceptor');
});

app.run(function ($rootScope, $location, Notifications) {
      
    // A chaque changement de route
    $rootScope.$on('$routeChangeStart', function (event, next, current) {

        // Redirection vers la page de login si l'utilisateur n'est pas authentifié
        // et qu'il essaye d'accéder à une page autre que la page de login
        if (!$rootScope.isLogged() && next.templateUrl != 'views/login.html') {
            $location.path('/login');
        }

        // Remise à vide des notifications
        if (!Notifications.isKeepMessage()) {
            Notifications.clear();
        } else {
            Notifications.setKeepMessage(false);
        }
    });
});