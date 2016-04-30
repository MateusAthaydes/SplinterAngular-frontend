'use strict';

describe('Service: instituicao', function () {

  // load the service's module
  beforeEach(module('splinterAngularFrontendApp'));

  // instantiate service
  var instituicao;
  beforeEach(inject(function (_instituicao_) {
    instituicao = _instituicao_;
  }));

  it('should do something', function () {
    expect(!!instituicao).toBe(true);
  });

});
