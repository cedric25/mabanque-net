'use strict';

/**
 * Point d'accès vers les web-services exposés par le backend.
 * On définit une ressource par URL.
 */

var port = 3000;
var host = 'http://localhost::port';

// Default actions:
/* -------------------------
{   'get':    {method:'GET'},
    'save':   {method:'POST'},
    'query':  {method:'GET', isArray:true},
    'remove': {method:'DELETE'},
    'delete': {method:'DELETE'} };
 * ------------------------- */

app.factory('Login', function($resource) {
    return $resource(host + '/login',
        { port: port },
        { 'login': {  method: 'POST' } });
})

app.factory('Users', function($resource) {
    return $resource(host + '/users/:id',
        { port: port, id: '@id' },
        { update: { method: 'PUT' } });
})
app.factory('UserLogin', function($resource) {
    return $resource(host + '/users/login/:login',
        { port: port, login: 'login' });
})

app.factory('Accounts', function($resource) {
    return $resource(host + '/accounts/:id',
        { port: port, id: '@id' },
        { update: { method: 'PUT' } });
})
app.factory('AccountsUser', function($resource) {
    return $resource(host + '/accounts/user/:login',
        { port: port, login: 'login' });
})
app.factory('AccountsNumber', function($resource) {
    return $resource(host + '/accounts/number/:number',
        { port: port, number: 'number' });
})
	
app.factory('Operations', function($resource) {
    return $resource(host + '/operations/:id',
        { port: port, id: '@id' },
        { update: { method: 'PUT' } });
})
app.factory('OperationsAccount', function($resource) {
    return $resource(host + '/operations/account/:number',
        { port: port, number: 'number' });
});