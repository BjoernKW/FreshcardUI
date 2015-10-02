'use strict';

/**
 * @ngdoc function
 * @name freshcardUiApp.controller:PublicProfileCtrl
 * @description
 * # PublicProfileCtrl
 * Controller of the freshcardUiApp
 */
angular.module('freshcardUiApp')
	.controller('PublicProfileCtrl', function (
		$scope,
		$rootScope,
		$routeParams,
		$localStorage,
		UserService,
		ContactService,
		VCardService,
		configuration
	) {
		$scope.changeMapCenter = function (center) {
			$scope.mapCenter = center;
		};

		$scope.shouldContactInfoBeDisplayed = function(entry) {
			return VCardService.shouldContactInfoBeDisplayed(entry);
		};

		$scope.lengthOfHash = function(hash) {
			return Object.keys(hash).length;
		};

		$scope.configuration = configuration;
		$scope.hashCode = $routeParams.hashCode;
		$scope.isPublic = true;

		$scope.profileVCards = [ ];

		UserService.findByHashCode(
			$routeParams.hashCode,
			function(user) {
				for (var i = 0; i < user.ownContacts.length; i++) {
					$scope.referencedUser = user;
					$scope.profileVCards[i] = VCardService.parseData(angular.fromJson(user.ownContacts[i].vcard));
					$scope.profileVCards[i].hashCode = user.ownContacts[i].hashCode;
				}

				if (user.ownContacts.length > 0) {
					$scope.mapCenter = $scope.profileVCards[0][5].value[0];
				}
			}
		);

		if ($routeParams.connectionHashCode) {
			ContactService.addMutualConnectionWithTemporaryUser(
				{
					hashCode: $routeParams.hashCode,
					connectionHashCode: $routeParams.connectionHashCode
				},
				function(newUser) {
					$scope.addConnectionSuccess = true;
					$scope.addConnectionError = false;

					$localStorage.newUser = newUser;
				},
				function(error) {
					$scope.addConnectionSuccess = false;
					$scope.addConnectionError = error.status;
				}
			);
		}
	});
