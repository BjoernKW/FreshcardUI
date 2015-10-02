'use strict';

describe('Controller: AdministrationCtrl', function () {

  // load the controller's module
  beforeEach(module('freshcardUiApp'));

  var AdministrationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdministrationCtrl = $controller('AdministrationCtrl', {
      $scope: scope
    });
  }));
});
