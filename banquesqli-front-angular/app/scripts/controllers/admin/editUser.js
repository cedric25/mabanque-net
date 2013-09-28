'use strict';

/**
 * Administration
 * Contrôleur associé à la création ou à la modification d'un utilisateur
 */
angular.module('banquesqliAngular01App')
  .controller('AdminEditUserCtrl', function ($scope, $routeParams, UserLogin, Users, Notifications) {

  	var userLogin = $routeParams.login;
      
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
				user.$save({}, function(data) {
                    if (data[0] === 'O' && data[1] === 'K') {
                        Notifications.setGreenMessage('Utilisateur créé');
                    }
                    else if (typeof data === 'object'
                             && typeof data.message !== 'undefined') {
                        Notifications.setRedMessage(data.message);
                    }
                    else {
                        Notifications.setRedMessage('Erreur serveur');
                    }
                });
			}
			else {
				user.$update({'id': $scope.user._id}, function(data) {
                    if (typeof data === 'object' && typeof data._id !== 'undefined') {
                        Notifications.setGreenMessage('Utilisateur sauvegardé');
                    }
                    else {
                        Notifications.setRedMessage('Erreur serveur');
                    }
                });
			}
		};

  });