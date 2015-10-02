'use strict';

/**
 * @ngdoc function
 * @name freshcardUiApp.controller:DeleteModalCtrl
 * @description
 * # DeleteModalCtrl
 * Controller of the freshcardUiApp
 */
angular.module('freshcardUiApp')
.controller('DeleteModalCtrl', function ($scope, $modalInstance) {
	$scope.delete = function() {
		$modalInstance.close();
	};

	$scope.cancel = function() {
		$modalInstance.dismiss();
	};
});
