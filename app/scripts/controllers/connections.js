'use strict';

/**
 * @ngdoc function
 * @name freshcardUiApp.controller:ConnectionsCtrl
 * @description
 * # ConnectionsCtrl
 * Controller of the freshcardUiApp
 */
angular.module('freshcardUiApp')
.controller('ConnectionsCtrl', function ($scope, $rootScope, $modal, $timeout, UserService, ContactService, ContactSearchService, VCardService, FileUploader, configuration) {
	$scope.openDeleteModal = function(contactId) {
		$rootScope.contactIdForRemoval = contactId;

		var modal = $modal.open(
			{
				templateUrl: 'modalContent.html',
				controller: 'DeleteModalCtrl',
				size: 'sm'
			}
		);

		modal.result.then(function () {
			ContactService.removeConnection(
				$.param(
					{
						userId: $rootScope.user.id,
						otherContactId: $rootScope.contactIdForRemoval,
						organizationId: $rootScope.user.currentOrganizationId,
					}
				),
				function() {
					$rootScope.connectionRemoved = true;
					$rootScope.contactIdForRemoval = null;

					$scope.searchIndex.clearCache();
					$scope.initRun = true;
					$timeout(
						function() {
							$scope.search($scope, $scope.searchIndex);
						},
						1000
					);

					$timeout(
						function() {
							$rootScope.connectionRemoved = false;
						},
						5000
					);
				},
				function() {
					$rootScope.contactIdForRemoval = null;
				}
			);
		});
	};

	$scope.selectPage = function(page) {
		$scope.currentPage = page;

		$scope.initRun = true;
		$scope.search($scope, $scope.searchIndex, page);
	};

	$scope.addConnection = function() {
		ContactService.addConnection(
			$.param(
				{
					userId: $rootScope.user.id,
					otherUsername: $scope.eMailAddress,
					organizationId: $rootScope.user.currentOrganizationId
				}
			),
			function() {
				$scope.addConnectionSuccess = true;
				$scope.addConnectionError = false;

				$rootScope.connectionRemoved = false;

				$scope.initRun = true;
				$scope.search($scope, $scope.searchIndex);
			},
			function() {
				UserService.sendEMailConnectionRequest(
					$.param(
						{
							username: $rootScope.user.name,
							recipientEMailAddress: $scope.eMailAddress
						}
					),
					function() {
						$scope.addConnectionSuccess = true;
						$scope.addConnectionError = false;

						$scope.searchIndex.clearCache();
						$scope.initRun = true;
						$timeout(
							function() {
								$scope.search($scope, $scope.searchIndex);
							},
							1000
						);
					},
					function(error) {
						$scope.addConnectionSuccess = false;
						$scope.addConnectionError = error.status;
					}
				);
			}
		);
	};

	$scope.searchIndex = ContactSearchService.getIndex();
	$scope.search = function($scope, searchIndex, page) {
		ContactSearchService.search($scope, $scope.searchIndex, page);
	};

	$scope.hits = [ ];
	$scope.query = '';
	$scope.initRun = true;

	$scope.vCards = [ ];

	$scope.currentPage = 1;
	$scope.itemsPerPage = 10;
	$scope.maxSize = 10;

	$rootScope.connectionRemoved = false;

	$scope.search($scope, $scope.searchIndex);

	var uploader = $scope.uploader = new FileUploader(
		{
			url: configuration.apiRootURL + 'api/v1/contacts/createFromVCard/' + $rootScope.user.id,
			headers: {
				'X-Auth-Token': $rootScope.authToken
			}
		}
	);

	uploader.onAfterAddingFile = function(fileItem) {
		fileItem.upload();
	};

	uploader.onCompleteItem = function(fileItem, response) {
		if (response.numberOfImportedVCards > 0) {
			$scope.search($scope, $scope.searchIndex);
		}
	};

	$rootScope.$watch(
		'user.searchPublicKey',
		function(newValue, oldValue) {
			if (oldValue !== newValue) {
				$scope.searchIndex = ContactSearchService.getIndex();
				$scope.search($scope, $scope.searchIndex);
			}
		},
		true
	);
});
