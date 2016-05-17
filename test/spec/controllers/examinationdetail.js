'use strict';

describe('Controller: ExaminationdetailCtrl', function () {

  // load the controller's module
  beforeEach(module('splinterAngularFrontendApp'));

  var ExaminationdetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExaminationdetailCtrl = $controller('ExaminationdetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ExaminationdetailCtrl.awesomeThings.length).toBe(3);
  });
});
