'use strict';

describe('Controller: ChangeUsernameCtrl', function () {

  // load the controller's module
  beforeEach(module('freshcardUiApp'));

  var ChangeUsernameCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChangeUsernameCtrl = $controller('ChangeUsernameCtrl', {
      $scope: scope
    });
  }));
});
