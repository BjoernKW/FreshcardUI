'use strict';

/**
 * @ngdoc function
 * @name freshcardUiApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the freshcardUiApp
 */
angular.module('freshcardUiApp')
.controller('LoginCtrl', function ($scope, $rootScope, $location, $cookieStore, $localStorage, UserService, ConfigurationService) {
	$scope.rememberMe = true;

	$scope.login = function() {
		UserService.authenticate(
			$.param(
				{
					username: $scope.eMailAddress,
					password: $scope.password
				}
			),
			function(authenticationResult) {
				var authToken = authenticationResult.token;
				$rootScope.authToken = authToken;
				if ($scope.rememberMe) {
					$cookieStore.put('authToken', authToken);
				}
				
				if ($rootScope.$storage.algoliaApplicationID !== undefined) {
					$rootScope.algoliaApplicationID = $rootScope.$storage.algoliaApplicationID;
				} else {
					ConfigurationService.getAlgoliaConfiguration(
						function(algoliaConfiguration) {
							$rootScope.algoliaApplicationID = $rootScope.$storage.algoliaApplicationID = algoliaConfiguration.algoliaApplicationID;
						}
					);
				}

				UserService.get(function(user) {
					$localStorage.user = $rootScope.user = user;

					var currentOrganizationName;
					var currentOrganizationTemplate;
					var currentOrganizationLogo;
					for (var i = 0; i < user.organizations.length; i++) {
						if (user.organizations[i].id === user.currentOrganizationId) {
							currentOrganizationName = user.organizations[i].name;
							currentOrganizationTemplate = user.organizations[i].templateImagePath;
							currentOrganizationLogo = user.organizations[i].logoImagePath;
						}
					}
					$localStorage.currentOrganizationName = $rootScope.currentOrganizationName = currentOrganizationName;
					$localStorage.currentOrganizationTemplate = $rootScope.currentOrganizationTemplate = currentOrganizationTemplate;
					$localStorage.currentOrganizationLogo = $rootScope.currentOrganizationLogo = currentOrganizationLogo;

					if (user.roles.hasOwnProperty('ROLE_BETA_TESTER')) {
						$localStorage.isBetaTester = $rootScope.isBetaTester = user.roles.ROLE_BETA_TESTER;
					}
					
					$rootScope.passwordChanged = false;

					$.slidebars();

					$location.path('/');
				});
			},
			function(error) {
				$scope.authenticationError = error.status;
			}
		);
	};
});
