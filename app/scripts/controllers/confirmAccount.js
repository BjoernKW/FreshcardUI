'use strict';

/**
 * @ngdoc function
 * @name freshcardUiApp.controller:ConfirmAccountCtrl
 * @description
 * # ConfirmAccountCtrl
 * Controller of the freshcardUiApp
 */
angular.module('freshcardUiApp')
	.controller('ConfirmAccountCtrl', function ($scope, $rootScope, $routeParams, $location, UserService) {
		UserService.confirmAccount(
			$routeParams.hashCode,
			function(user) {
				if (user.confirmed) {
					$rootScope.accountConfirmed = true;

					if ($rootScope.authToken) {
						$location.path('/account');
					} else {
						$location.path('/login');
					}
				}
			}
		);
	});
