'use strict';

angular.module('freshcardServices')
	.factory('OrganizationService', function($resource, configuration) {
		return $resource(configuration.apiRootURL + 'api/v1/organizations/:organizationId',
			{ },
			{
				findByUsername: {
					method: 'POST',
					params: {
						organizationId: 'findByUsername',
					},
					isArray: true
				},
				get: {
					method: 'GET'
				},
				create: {
					method: 'POST'
				},
				update: {
					params: { organizationId: '@id' },
					method: 'PUT'
				},
				publishTemplate: {
					method: 'POST',
					params: {
						organizationId: 'publishTemplate',
					}
				},
				delete: {
					method: 'DELETE'
				}
			}
		);
	});
