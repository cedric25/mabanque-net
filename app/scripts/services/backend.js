'use strict';

var port = 3000;
var host = 'http://localhost::port';

var resourceActions = ["get", "save", "query", "remove", "delete"];

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
    	{ login: { method: 'POST' } });
  })

	.factory('Users', function($resource, TokenHandler) {
    // Original resource
    var resource = $resource(host + '/users/:id',
      { port: port, id: '@id' },
      { update: { method: 'PUT' } }
    );
    // Adding token
    resourceActions.push('update');
    resource = TokenHandler.wrapActions(resource, resourceActions);
    return resource;
  })
  .factory('UserLogin', function($resource, TokenHandler) {
    // Original resource
    var resource = $resource(host + '/users/login/:login',
    	{ port: port, login: 'login' });
    // Adding token
    resource = TokenHandler.wrapActions(resource, resourceActions);
    return resource;
  })

	.factory('Accounts', function($resource, TokenHandler) {
    // Original resource
    var resource = $resource(host + '/accounts/:id',
      { port: port, id: '@id' },
      { update: { method: 'PUT' } }
    );
    // Adding token
    resourceActions.push('update');
    resource = TokenHandler.wrapActions(resource, resourceActions);
    return resource;
  })
  .factory('AccountsUser', function($resource, TokenHandler) {
    // Original resource
    var resource = $resource(host + '/accounts/user/:login',
      { port: port, login: 'login' }
    );
    // Adding token
    resource = TokenHandler.wrapActions(resource, resourceActions);
    return resource;
  })
  .factory('AccountsNumber', function($resource, TokenHandler) {
    // Original resource
    var resource = $resource(host + '/accounts/number/:number',
      { port: port, number: 'number' }
    );
    // Adding token
    resource = TokenHandler.wrapActions(resource, resourceActions);
    return resource;
  })
	
	.factory('Operations', function($resource, TokenHandler) {
    // Original resource
    var resource = $resource(host + '/operations/:id',
      { port: port, id: '@id' },
      { update: { method: 'PUT' } }
    );
    // Adding token
    resourceActions.push('update');
    resource = TokenHandler.wrapActions(resource, resourceActions);
    return resource;
	})
	.factory('OperationsAccount', function($resource, TokenHandler) {
    // Original resource
    var resource = $resource(host + '/operations/account/:number',
      { port: port, number: 'number' }
    );
    // Adding token
    resource = TokenHandler.wrapActions(resource, resourceActions);
    return resource;
	});