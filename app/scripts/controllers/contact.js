'use strict';

/**
 * @ngdoc function
 * @name freshcardUiApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the freshcardUiApp
 */
angular.module('freshcardUiApp')
.controller('ContactCtrl', function ($scope, $rootScope, $routeParams, ContactService, VCardService, configuration) {
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

	if ($routeParams.coWorkerUserId) {
		ContactService.getCoWorker(
			{
				userId: $routeParams.coWorkerUserId,
				contactId: $routeParams.id,
				organizationId: $rootScope.user.currentOrganizationId,
			},
			function(contact) {
				contact.vcard = angular.fromJson(contact.vcard);
				contact.vCardData = VCardService.parseData(contact.vcard);

				$scope.contact = contact;
				$scope.mapCenter = contact.vCardData[5].value[0];
			}
		);
	} else {
		ContactService.getUserConnection(
			{
				userId: $rootScope.user.id,
				contactId: $routeParams.id,
				organizationId: $rootScope.user.currentOrganizationId,
			},
			function(contact) {
				contact.vcard = angular.fromJson(contact.vcard);
				contact.vCardData = VCardService.parseData(contact.vcard);

				$scope.contact = contact;
				$scope.mapCenter = contact.vCardData[5].value[0];
			}
		);
	}
});
