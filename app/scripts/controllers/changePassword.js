'use strict';

/**
 * @ngdoc function
 * @name freshcardUiApp.controller:ChangePasswordCtrl
 * @description
 * # ChangePasswordCtrl
 * Controller of the freshcardUiApp
 */
angular.module('freshcardUiApp')
.controller('ChangePasswordCtrl', function ($scope, $rootScope, $routeParams, $location, UserService) {
	$scope.changePassword = function () {
		UserService.changePassword(
			{
				confirmationHashCode: $routeParams.hashCode,
				password: $scope.password
			},
			function(user) {
				if (user.confirmed) {
					$rootScope.passwordChanged = true;
					$rootScope.logout();
				}
			}
		);
	};
});
