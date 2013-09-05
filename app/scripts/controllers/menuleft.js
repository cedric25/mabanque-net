'use strict';

angular.module('banquesqliAngular01App')
  .controller('MenuLeftController', function ($scope, $rootScope, AccountsUser, $location) {

  	// Liste des comptes bancaires de l'utilisateur
  	$scope.comptes = AccountsUser.query(
      {login: $rootScope.getLogin()});

    var LENGTH_LIKE_START = 10;

  	$scope.isActive = function(path, onlyStart) {
		
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
  		}
  		else {
  			return '';
  		}
  	};

  });