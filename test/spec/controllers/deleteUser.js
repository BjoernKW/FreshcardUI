'use strict';

describe('Controller: DeleteUserCtrl', function () {

  // load the controller's module
  beforeEach(module('freshcardUiApp'));

  var DeleteUserCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DeleteUserCtrl = $controller('DeleteUserCtrl', {
      $scope: scope
    });
  }));
});
