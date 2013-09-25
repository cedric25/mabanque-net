'use strict';

describe('Controller: HomeCtrl', function () {

  var HomeCtrl;
  var scope;
  var mockAccountsUser;

  // load the controller's module
 
  // Creates a mock AccountsUser resource, used by home.js
  beforeEach(function() {
    mockAccountsUser = {query: jasmine.createSpy()};
    module(function($provide) {
      $provide.value('AccountsUser', mockAccountsUser);
    });
  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {

    scope = $rootScope.$new();

    var rootCtrl = $controller('RootController', {
      $scope: scope
    });

    HomeCtrl = $controller('HomeCtrl', {
      $scope: scope,
      $rootScope: rootCtrl.scope,
      AccountsUser: mockAccountsUser
    });
  }));

  it('should create a validationMsg variable equals to an empty string', function () {
    expect(scope.validationMsg).toBe('');
  });

  describe('isNotBlank', function () {

    it('should return false because validationMsg is empty at the beginning', function () {
      expect(scope.isNotBlank()).toBe(false);
    });

    it('should return true after assigning a value to validationMsg', function () {
      expect(scope.isNotBlank()).toBe(false);
      scope.validationMsg = 'a';
      expect(scope.isNotBlank()).toBe(true);
    });

  });

});
