'use strict';

/**
 * @ngdoc function
 * @name freshcardUiApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the freshcardUiApp
 */
angular.module('freshcardUiApp')
.controller('AccountCtrl', function ($scope, $rootScope, $routeParams, $location, $modal, UserService) {
	$scope.changePassword = function () {
		UserService.updatePassword(
			{
					id: $rootScope.user.id,
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

	$scope.changeUsername = function () {
		UserService.updateUsername(
			{
				id: $rootScope.user.id,
				username: $rootScope.user.name,
				newUsername: $scope.eMailAddress
			},
			function() {
				$rootScope.usernameChanged = true;
				$rootScope.logout();
			}
		);
	};

	$scope.openDeleteModal = function(userId) {
		var modal = $modal.open(
			{
				templateUrl: 'modalContent.html',
				controller: 'DeleteModalCtrl',
				size: 'sm',
			}
		);

		modal.result.then(function () {
			UserService.delete(
				{
					action: userId,
				},
				function() {
					$rootScope.userRemovedSuccess = true;
					if (!$rootScope.user.roles.ROLE_SUPER_ADMIN) {
						$rootScope.logout();
					}
				},
				function() {
					$rootScope.userRemovedError = true;
				}
			);
		});
	};

	$rootScope.userRemovedError = false;
	$rootScope.userRemovedSuccess = false;
	$rootScope.accountConfirmed = false;
	$rootScope.passwordChanged = false;

	$scope.userIdForRemoval = $rootScope.user.id;
});
