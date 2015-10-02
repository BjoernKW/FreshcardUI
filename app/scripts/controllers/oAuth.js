'use strict';

/**
 * @ngdoc function
 * @name freshcardUiApp.controller:OAuthCtrl
 * @description
 * # OAuthCtrl
 * Controller of the freshcardUiApp
 */
angular.module('freshcardUiApp')
.controller('OAuthCtrl', function ($scope,  $rootScope, $cookies, $cookieStore, $localStorage, $location, UserService) {
	$scope.rememberMe = true;

	UserService.authenticateViaOAuth(
		$.param(
			{
				username: $cookies.eMailAddress,
				accessToken: $cookies.accessToken
			}
		),
		function(authenticationResult) {
			$cookies.eMailAddress = undefined;
			$cookies.accessToken = undefined;
			$cookies.oAuthService = undefined;

			var authToken = authenticationResult.token;
			$rootScope.authToken = authToken;
			if ($scope.rememberMe) {
				$cookieStore.put('authToken', authToken);
			}
			
			UserService.get(function(user) {
				$localStorage.user = $rootScope.user = user;
				
				$rootScope.passwordChanged = false;

				$location.path('/');
			});
		},
		function(error) {
			$scope.authenticationError = error.status;
		}
	);
});

