'use strict';

describe('Controller: PublicProfileCtrl', function () {

  // load the controller's module
  beforeEach(module('freshcardUiApp'));

  var PublicProfileCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PublicProfileCtrl = $controller('PublicProfileCtrl', {
      $scope: scope
    });
  }));
});
