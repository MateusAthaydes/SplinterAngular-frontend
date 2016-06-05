'use strict';

describe('Controller: InstitutiondetailCtrl', function () {

  // load the controller's module
  beforeEach(module('splinterAngularFrontendApp'));

  var InstitutiondetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InstitutiondetailCtrl = $controller('InstitutiondetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(InstitutiondetailCtrl.awesomeThings.length).toBe(3);
  });
});
