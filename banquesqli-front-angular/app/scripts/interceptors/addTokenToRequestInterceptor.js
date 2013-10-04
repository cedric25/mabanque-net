/*
 * Intercepteur
 * Ajoute le token en paramètre de la request
 * (Intercepteur enregistré dans app.js)
 */
angular.module('banquesqliAngular01App')

.factory('AddTokenToRequestInterceptor', function (TokenHandler, $q) {
    return {
        'request': function (config) {
            // Si la requête est destinée au backend, et si un token est présent en session, on l'ajoute en paramètre à la requête
            if (typeof config !== 'undefined' && config.url.substr(0, 22) === 'http://localhost:3000/' && TokenHandler.isSet()) {
                if (typeof config.params === 'undefined') {
                    config.params = {};
                }
                config.params.token = TokenHandler.get();
            }
            return config || $q.when(config);
        }
    };
});