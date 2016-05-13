'use strict';

describe('Service: institution', function () {

  // load the service's module
  beforeEach(module('splinterAngularFrontendApp'));

  // instantiate service
  var institution;
  beforeEach(inject(function (_institution_) {
    institution = _institution_;
  }));

  it('should do something', function () {
    expect(!!institution).toBe(true);
  });

});
