'use strict';

describe('Controller: ExaminationCtrl', function () {

  // load the controller's module
  beforeEach(module('splinterAngularFrontendApp'));

  var ExaminationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExaminationCtrl = $controller('ExaminationCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ExaminationCtrl.awesomeThings.length).toBe(3);
  });
});
