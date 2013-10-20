'use strict';

/**
 * Contrôleur associé à la page de login
 */
app.controller('LoginCtrl', function ($scope, $rootScope, Login, $location, Notifications) {

    // Données du formulaire
    $scope.user = {
        login: '1234',
        password: 'password'
    };

    $scope.doLogin = function () {
        var loginResponse = Login.login(
        // Data
        {
            login: $scope.user.login,
            password: $scope.user.password
        },
        // Success
        function (value, responseHeaders) {
            if (value.authenticated) {
                $rootScope.setLoggedUser(value);
                redirectToHome();
            } else {
               Notifications.setRedMessage('Login ou mot de passe incorrect');
            }
        },
        // Error

        function (httpResponse) {
            Notifications.setRedMessage('Erreur réseau');
        });
    };

    var redirectToHome = function () {
        Notifications.setGreenMessage('Bienvenue !', true);
        $location.path('/');
    };

});