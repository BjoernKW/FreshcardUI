'use strict';

describe('Controller: OrganizationCtrl', function () {

  // load the controller's module
  beforeEach(module('freshcardUiApp'));

  var OrganizationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrganizationCtrl = $controller('OrganizationCtrl', {
      $scope: scope
    });
  }));
});
