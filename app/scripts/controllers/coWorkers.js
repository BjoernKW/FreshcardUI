'use strict';

/**
 * @ngdoc function
 * @name freshcardUiApp.controller:CoWorkersCtrl
 * @description
 * # CoWorkersCtrl
 * Controller of the freshcardUiApp
 */
angular.module('freshcardUiApp')
.controller('CoWorkersCtrl', function ($scope, $rootScope, $modal, $timeout, UserService, ContactService, VCardService, ContactSearchService) {
	$scope.openDeleteModal = function(userId, contactId) {
		$rootScope.coWorkerUserIdForRemoval = userId;
		$rootScope.contactIdForRemoval = contactId;

		var modal = $modal.open(
			{
				templateUrl: 'modalContent.html',
				controller: 'DeleteModalCtrl',
				size: 'sm'
			}
		);

		modal.result.then(function () {
			ContactService.removeCoWorker(
				$.param(
					{
						userId: $rootScope.coWorkerUserIdForRemoval,
						organizationId: $rootScope.user.currentOrganizationId,
					}
				),
				function() {
					$rootScope.coWorkerRemoved = true;
					$rootScope.coWorkerUserIdForRemoval = null;
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
							$rootScope.coWorkerRemoved = false;
						},
						5000
					);
				},
				function() {
					$rootScope.coWorkerUserIdForRemoval = null;
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

	$scope.addCoWorker = function() {
		ContactService.addCoWorker(
			$.param(
				{
					userId: $rootScope.user.id,
					otherUsername: $scope.eMailAddress,
					organizationId: $rootScope.user.currentOrganizationId,
				}
			),
			function() {
				$scope.addCoWorkerSuccess = true;
				$scope.addCoWorkerError = false;

				$rootScope.coWorkerRemoved = false;

				$scope.initRun = true;
				$scope.search($scope, $scope.searchIndex);
			},
			function() {
				UserService.addCoWorkerViaEMail(
					{
						username: $rootScope.user.name,
						organizationId: $rootScope.user.currentOrganizationId,
						recipientEMailAddress: $scope.eMailAddress
					},
					function() {
						$scope.addCoWorkerSuccess = true;
						$scope.addCoWorkerError = false;

						$rootScope.coWorkerRemoved = false;

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
						$scope.addCoWorkerSuccess = false;
						$scope.addCoWorkerError = error.status;
					}
				);
			}
		);
	};

	$scope.searchIndex = ContactSearchService.getIndexForCoWorkers();
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

	$scope.vCards = [ ];

	$rootScope.coWorkerRemoved = false;

	$scope.search($scope, $scope.searchIndex);

	$rootScope.$watch(
		'user.searchPublicKeyForCoWorkers',
		function(newValue, oldValue) {
			if (oldValue !== newValue) {
				$scope.searchIndex = ContactSearchService.getIndexForCoWorkers();
				$scope.search($scope, $scope.searchIndex);
			}
		},
		true
	);
});
