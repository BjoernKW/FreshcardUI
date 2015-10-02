'use strict';

describe('Controller: ConnectionsCtrl', function () {

  // load the controller's module
  beforeEach(module('freshcardUiApp'));

  var ConnectionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConnectionsCtrl = $controller('ConnectionsCtrl', {
      $scope: scope
    });
  }));
});
