/*
 * Intercepteur
 * Ajoute le token en paramètre de la request
 * (Intercepteur enregistré dans app.js)
 */
angular.module('banquesqliAngular01App')
	.factory('AddTokenToRequestInterceptor',
		['TokenHandler', '$q', function (TokenHandler, $q) {
	  return {
	  		'request': function(config) {
	  			// Si un token est présent en session, on l'ajoute en paramètre à la requête
	  			if (typeof config !== 'undefined' && TokenHandler.isSet()) {
						if (typeof config.params === 'undefined') {
							config.params = {};
						}
						config.params.token = TokenHandler.get();
	  			}
      		return config || $q.when(config);
	  		}
	  };
}]);