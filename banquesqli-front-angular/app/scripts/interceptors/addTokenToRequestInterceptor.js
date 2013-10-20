/*
 * Intercepteur
 * Ajoute le token en paramètre de la request
 * (Intercepteur enregistré dans app.js)
 */
app.factory('AddTokenToRequestInterceptor', function (TokenHandler, $q, constants) {
    return {
        'request': function (config) {
            if (config
                    // Si la requête est destinée au backend
                    && config.url.substr(0, 22) === constants.CONTEXTPATH
                    // Si la requête ne provient pas de la page de login (pas besoin de token pour ce cas)
                    && config.url !== constants.CONTEXTPATH + 'login'
                    // Si un token est présent en session
                    && TokenHandler.isSet()) {
                if (typeof config.params === 'undefined') {
                    config.params = {};
                }
                // On l'ajoute en paramètre à la requête
                config.params.token = TokenHandler.get();
            }
            return config || $q.when(config);
        }
    };
});