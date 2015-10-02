'use strict';

describe('Controller: ConfirmAccountCtrl', function () {

  // load the controller's module
  beforeEach(module('freshcardUiApp'));

  var ConfirmAccountCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConfirmAccountCtrl = $controller('ConfirmAccountCtrl', {
      $scope: scope
    });
  }));
});
