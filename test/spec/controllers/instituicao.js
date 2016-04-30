'use strict';

describe('Controller: InstituicaoCtrl', function () {

  // load the controller's module
  beforeEach(module('splinterAngularFrontendApp'));

  var InstituicaoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InstituicaoCtrl = $controller('InstituicaoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(InstituicaoCtrl.awesomeThings.length).toBe(3);
  });
});
