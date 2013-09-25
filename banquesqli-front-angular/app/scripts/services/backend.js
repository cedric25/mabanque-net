'use strict';

/**
 * Point d'accès vers les web-services exposés par le backend.
 * On définit une ressource par URL.
 */

var port = 3000;
var host = 'http://localhost::port';

angular.module('banquesqliAngular01App')

	// Default actions:
	/* -------------------------
	{ 'get':    {method:'GET'},
		'save':   {method:'POST'},
		'query':  {method:'GET', isArray:true},
		'remove': {method:'DELETE'},
		'delete': {method:'DELETE'} };
	 * ------------------------- */

  .factory('Login', function($resource) {
    return $resource(host + '/login',
    	{ port: port },
    	{ 'login': {  method: 'POST' } });
  })

	.factory('Users', function($resource, TokenHandler) {
    return $resource(host + '/users/:id',
      { port: port, id: '@id' },
      { update: { method: 'PUT' } }
    );
  })
  .factory('UserLogin', function($resource, TokenHandler) {
    return $resource(host + '/users/login/:login',
    	{ port: port, login: 'login' });
  })

  .factory('Accounts', function($resource, TokenHandler) {
    return $resource(host + '/accounts/:id',
      { port: port, id: '@id' },
      { update: { method: 'PUT' } }
    );
  })
  .factory('AccountsUser', function($resource, TokenHandler, $http, $rootScope, FrontSession) {
    return $resource(host + '/accounts/user/:login',
      { port: port, login: 'login' }
    );
  })
  .factory('AccountsNumber', function($resource, TokenHandler) {
    return $resource(host + '/accounts/number/:number',
      { port: port, number: 'number' }
    );
  })
	
	.factory('Operations', function($resource, TokenHandler) {
    return $resource(host + '/operations/:id',
      { port: port, id: '@id' },
      { update: { method: 'PUT' } }
    );
	})
	.factory('OperationsAccount', function($resource, TokenHandler) {
    return $resource(host + '/operations/account/:number',
      { port: port, number: 'number' }
    );
	});