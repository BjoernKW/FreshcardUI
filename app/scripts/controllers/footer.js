'use strict';

/**
 * @ngdoc function
 * @name freshcardUiApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the freshcardUiApp
 */
angular.module('freshcardUiApp')
.controller('FooterCtrl', function ($scope) {
  	var today = new Date();
	$scope.currentYear = today.getFullYear();
});
