'use strict';

angular.module('banquesqliAngular01App')
  .controller('AdminUsersCtrl', function ($scope, Users) {

  	$scope.users = Users.query();

  });