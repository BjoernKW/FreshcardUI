'use strict';

/**
 * @ngdoc function
 * @name freshcardUiApp.controller:OrganizationCtrl
 * @description
 * # OrganizationCtrl
 * Controller of the freshcardUiApp
 */
angular.module('freshcardUiApp')
.controller('OrganizationCtrl', function ($scope, $rootScope, $location, $routeParams, $modal, OrganizationService) {
	$scope.openDeleteModal = function() {
		var modal = $modal.open(
			{
				templateUrl: 'modalContent.html',
				controller: 'DeleteModalCtrl',
				size: 'sm',
			}
		);

		modal.result.then(function () {
			OrganizationService.delete(
				{
					id: $routeParams.id,
				},
				function() {
					$rootScope.organizationDeleted = true;

					$location.path('/account');
				}
			);
		});
	};

	$scope.delete = function() {
		OrganizationService.delete(
			{
				id: $routeParams.id,
			},
			function() {
				$rootScope.organizationDeleted = true;

				$location.path('/account');
			}
		);
	};

	$scope.update = function() {
		OrganizationService.update(
			{
				id: $routeParams.id,
				name: $scope.organization.name,
				url: $scope.organization.url
			},
			function() {
				for (var i = 0; i < $rootScope.user.organizations.length; i++) {
					if($rootScope.user.organizations[i].id === parseInt($routeParams.id)) {
						$rootScope.user.organizations[i].name = $scope.user.organization.name;
						$rootScope.user.organizations[i].url = $scope.user.organization.url;
					}
				}

				$location.path('/account');
			}
		);
	};

	OrganizationService.get(
		{
			organizationId: $routeParams.id,
		},
		function(organization) {
			$scope.organization = organization;
		}
	);
});
