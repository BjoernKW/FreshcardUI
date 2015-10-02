'use strict';

describe('Controller: PasswordForgottenCtrl', function () {

  // load the controller's module
  beforeEach(module('freshcardUiApp'));

  var PasswordForgottenCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PasswordForgottenCtrl = $controller('PasswordForgottenCtrl', {
      $scope: scope
    });
  }));
});
