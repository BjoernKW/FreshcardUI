'use strict';

describe('Controller: OAuthCtrl', function () {

  // load the controller's module
  beforeEach(module('freshcardUiApp'));

  var OAuthCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OAuthCtrl = $controller('OAuthCtrl', {
      $scope: scope
    });
  }));
});
