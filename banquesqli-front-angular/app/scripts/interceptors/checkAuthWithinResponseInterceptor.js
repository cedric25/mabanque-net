/*
 * Intercepteur
 * Analyse toutes les réponses reçues pour détecter si le token a expiré
 * Si c'est le cas, redirige vers la page de login
 * (Intercepteur enregistré dans app.js)
 */
angular.module('banquesqliAngular01App')
	.factory('CheckAuthWithinResponseInterceptor', function ($rootScope, Notifications, $q, $location) {
	  return {
	  		'response': function (response) {
	          if (typeof response !== 'undefined'
	          	&& typeof response.data === 'object'
              	&& typeof response.data.authenticated !== 'undefined'
                && response.data.authenticated === false) {
              // Redirection vers la page de login
              $rootScope.clearUser();
              Notifications.setRedMessage('La session a expiré, veuillez vous reconnecter.', true);
              $rootScope.redirectToLogin();
            }
            return response || $q.when(response);
	      }
	  };
});