'use strict';

/**
 * @ngdoc function
 * @name freshcardUiApp.controller:SignUpCtrl
 * @description
 * # SignUpCtrl
 * Controller of the freshcardUiApp
 */
angular.module('freshcardUiApp')
.controller('SignUpCtrl', function ($scope, $rootScope, $location, $localStorage, $cookieStore, UserService) {
	$scope.rememberMe = true;

	if ($localStorage.newUser) {
		$scope.eMailAddress = $localStorage.newUser.username;
		$scope.newUser = $localStorage.newUser;
	}

	var authenticate = function(authenticationResult) {	
		var authToken = authenticationResult.token;
		$rootScope.authToken = authToken;
		if ($scope.rememberMe) {
			$cookieStore.put('authToken', authToken);
		}
		
		UserService.get(
			function(user) {
				$localStorage.user = $rootScope.user = user;

				$location.path('/');
			}
		);
	};
	
	$scope.signUp = function() {
		UserService.signUp(
			{
				username: $scope.eMailAddress,
				password: $scope.password,
				preferredLanguage: $rootScope.$storage.language.substring(0, 2)
			},
			function(authenticationResult) {
				authenticate(authenticationResult);

				$scope.usernameTakenError = false;
			},
			function() {
				$scope.usernameTakenError = true;
			}
		);
	};

	$scope.signUpExistingUser = function() {
		UserService.signUpExistingUser(
			{
				username: $scope.eMailAddress,
				password: $scope.password,
				preferredLanguage: $rootScope.$storage.language.substring(0, 2),
				hashCode: $localStorage.newUser.hashCode
			},
			function(authenticationResult) {
				authenticate(authenticationResult);

				$localStorage.newUser = null;
			}
		);
	};
});
