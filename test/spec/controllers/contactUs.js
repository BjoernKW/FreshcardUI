'use strict';

describe('Controller: ContactUsCtrl', function () {

  // load the controller's module
  beforeEach(module('freshcardUiApp'));

  var ContactUsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContactUsCtrl = $controller('ContactUsCtrl', {
      $scope: scope
    });
  }));
});
