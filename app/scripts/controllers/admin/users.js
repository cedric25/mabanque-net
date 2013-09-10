'use strict';

angular.module('banquesqliAngular01App')
  .controller('AdminUsersCtrl', ['$scope', 'Users', function ($scope, Users) {

  	$scope.validationMsg = '';

  	$scope.users = Users.query();

  	$scope.deleteUser = function(user) {

			$scope.validationMsg = 'L\'utilisateur "' + user.firstName + ' ' + user.lastName + '" a été supprimé.';
  		Users.delete(
  			{'id': user._id},
  			function (data) {
  				$scope.users = Users.query();
  			});
  	};

  }]);