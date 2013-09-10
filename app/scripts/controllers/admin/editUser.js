'use strict';

angular.module('banquesqliAngular01App')
  .controller('AdminEditUserCtrl', function ($scope, $routeParams, UserLogin, Users) {

  	var userLogin = $routeParams.login;
		
		$scope.validationMsg = '';
		$scope.title = 'Nouvel utilisateur';
		
		if (userLogin != null) {
			// Récupération du user
			$scope.user = UserLogin.get(
				{login: userLogin},
				function() {
					$scope.title = $scope.user.firstName + ' ' + $scope.user.lastName;
				});
		}
		
		/** saveUser() */
		$scope.saveUser = function() {

			var isCreation = true;
			if ($scope.user._id != null) {
				isCreation = false;
			}

			var user = new Users({
				login: $scope.user.login,
				password: $scope.user.password,
				firstName: $scope.user.firstName,
				lastName: $scope.user.lastName,
				admin: $scope.user.admin == true ? true : false
			});

			if (isCreation) {
				user.$save();
			}
			else {
				user.$update({'id': $scope.user._id});
			}

			$scope.validationMsg = 'Utilisateur sauvegardé';
		};

  });