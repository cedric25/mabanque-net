'use strict';

angular.module('banquesqliAngular01App')
  .controller('HomeCtrl', function ($scope, $rootScope, AccountsUser) {

  	// Liste des comptes bancaires de l'utilisateur
  	$scope.comptes = AccountsUser.query(
      {login: $rootScope.getLogin()});

  });
