'use strict';

/**
 * @ngdoc function
 * @name freshcardUiApp.controller:PasswordForgottenCtrl
 * @description
 * # PasswordForgottenCtrl
 * Controller of the freshcardUiApp
 */
angular.module('freshcardUiApp')
.controller('PasswordForgottenCtrl', function ($scope, $rootScope, UserService) {
	$scope.sendPasswordResetLink = function() {
		UserService.sendPasswordResetLink(
			{
				username: $scope.eMailAddress,
				preferredLanguage: $rootScope.$storage.language.substring(0, 2)
			},
			function() {
				$scope.eMailSent = true;
			}
		);
	};

	$scope.eMailSent = false;
});
