'use strict';

angular.module('banquesqliAngular01App')
  .controller('AdminAccountsCtrl', function ($scope, $rootScope, Accounts) {

  	$scope.comptes = Accounts.query();

  });