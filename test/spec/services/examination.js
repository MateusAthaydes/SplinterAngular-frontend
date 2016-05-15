'use strict';

describe('Service: examination', function () {

  // load the service's module
  beforeEach(module('splinterAngularFrontendApp'));

  // instantiate service
  var examination;
  beforeEach(inject(function (_examination_) {
    examination = _examination_;
  }));

  it('should do something', function () {
    expect(!!examination).toBe(true);
  });

});
