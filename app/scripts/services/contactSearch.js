'use strict';

angular.module('freshcardServices')
	.factory('ContactSearchService', function(configuration, $rootScope, VCardService) {
		return {
			getIndex: function() {
				var algolia = new AlgoliaSearch($rootScope.algoliaApplicationID, $rootScope.user.searchPublicKey, 'https');
				algolia.setSecurityTags('user_' + $rootScope.user.id + '_organization_' + $rootScope.user.currentOrganizationId);
				var index = algolia.initIndex(configuration.algoliaContactSearchIndex);
				return index;
			},
			getIndexForCoWorkers: function() {
				var algolia = new AlgoliaSearch($rootScope.algoliaApplicationID, $rootScope.user.searchPublicKeyForCoWorkers, 'https');
				algolia.setSecurityTags('coworkers_organization_' + $rootScope.user.currentOrganizationId);
				var index = algolia.initIndex(configuration.algoliaContactSearchIndex);
				return index;
			},
			search: function($scope, searchIndex, page) {
				searchIndex.search(
					$scope.query,
					function(success, content) {
						if (!success || $scope.query !== content.query) {
							return;
						}
						$scope.hits = content.hits;
						$scope.total = content.nbHits;

						for (var i = 0; i < $scope.hits.length; i++) {
							$scope.hits[i].vcard = angular.fromJson($scope.hits[i].vcard);
							$scope.hits[i].vCardData = VCardService.parseData($scope.hits[i].vcard);
						}

						if ($scope.initRun) {
							$scope.$apply();
							$scope.initRun = false;
						}
					},
					{
						hitsPerPage: $scope.itemsPerPage,
						page: (page !== undefined && page !== null) ? page - 1: 0
					}
				);
			}
		};
	});
