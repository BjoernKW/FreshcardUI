'use strict';

angular.module('freshcardServices')
	.factory('ConfigurationService', function($resource, configuration) {
		return $resource(configuration.apiRootURL + 'api/v1/configuration/:action',
			{ },
			{
				getAlgoliaConfiguration: {
					method: 'GET',
					params: {
						action: 'getAlgoliaConfiguration',
					}
				}
			}
		);
	});
