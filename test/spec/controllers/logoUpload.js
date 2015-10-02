'use strict';

describe('Controller: LogoUploadCtrl', function () {

  // load the controller's module
  beforeEach(module('freshcardUiApp'));

  var LogoUploadCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LogoUploadCtrl = $controller('LogoUploadCtrl', {
      $scope: scope
    });
  }));
});
