'use strict';

describe('Controller: InstitutionCtrl', function () {

  // load the controller's module
  beforeEach(module('splinterAngularFrontendApp'));

  var InstitutionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InstitutionCtrl = $controller('InstitutionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(InstitutionCtrl.awesomeThings.length).toBe(3);
  });
});
