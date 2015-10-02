'use strict';

describe('Service: VCardService', function () {
  var vCardService;

  beforeEach(function () {
    jasmine.getJSONFixtures().fixturesPath = 'base/test/mock';

    module('freshcardServices');
  });
  beforeEach(inject(function(_VCardService_) {
    vCardService = _VCardService_;
  }));

  it('should parse vCard data', function() {
    var vCardData = vCardService.parseData(getJSONFixture('vcard_john_doe.json'));

    expect(vCardData[0].key).toEqual('fn');
    expect(vCardData[1].key).toEqual('title');
    expect(vCardData[2].key).toEqual('org');
    expect(vCardData[3].key).toEqual('email');
    expect(vCardData[4].key).toEqual('tel');
    expect(vCardData[5].key).toEqual('adr');
    expect(vCardData[6].key).toEqual('url');
    expect(vCardData[7].key).toEqual('note');
    expect(vCardData[8].key).toEqual('categories');
    expect(vCardData[9].key).toEqual('photo');

    expect(vCardData[0].value).toEqual('John Doe');
    expect(vCardData[1].value).toEqual('Imaginary test person');
    expect(vCardData[3].value.length).toEqual(1);
    expect(vCardData[3].value[0]).toEqual('johnDoe@example.org');
  });
});
