'use strict';

describe('Filter: linkyTel', function () {
  var linkyTel;

  beforeEach(function () {
    module('ngSanitize');
    module('freshcardFilters');
  });
  beforeEach(inject(function($filter) {
    linkyTel = $filter('linkyTel');
  }));

  it('should recognize valid phone numbers', function() {
    expect(linkyTel('+1 (617) 555-1234')).toEqual('<a href="tel:+1 (617) 555-1234">+1 (617) 555-1234</a><br/>');
    expect(linkyTel('+1 781 555 1212')).toEqual('<a href="tel:+1 781 555 1212">+1 781 555 1212</a><br/>');
    expect(linkyTel('202 555 1212')).toEqual('<a href="tel:202 555 1212">202 555 1212</a><br/>');
    expect(linkyTel('+44-555-666666')).toEqual('<a href="tel:+44-555-666666">+44-555-666666</a><br/>');
  });

  it('should ignore everything else', function() {
    expect(linkyTel('string test')).toEqual('string test');
    expect(linkyTel('666666')).toEqual('666666');
  });
});
