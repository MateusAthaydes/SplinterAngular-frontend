'use strict';

describe('Controller: PracticequestionsCtrl', function () {

  // load the controller's module
  beforeEach(module('splinterAngularFrontendApp'));

  var PracticequestionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PracticequestionsCtrl = $controller('PracticequestionsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PracticequestionsCtrl.awesomeThings.length).toBe(3);
  });
});
