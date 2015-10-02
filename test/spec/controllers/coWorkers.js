'use strict';

describe('Controller: CoWorkersCtrl', function () {

  // load the controller's module
  beforeEach(module('freshcardUiApp'));

  var CoWorkersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CoWorkersCtrl = $controller('CoWorkersCtrl', {
      $scope: scope
    });
  }));
});
