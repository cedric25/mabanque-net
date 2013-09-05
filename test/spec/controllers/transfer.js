'use strict';

describe('Controller: TransferCtrl', function () {

  // load the controller's module
  beforeEach(module('banquesqliFrontAngular01App'));

  var TransferCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransferCtrl = $controller('TransferCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
