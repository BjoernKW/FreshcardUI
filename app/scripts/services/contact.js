'use strict';

angular.module('freshcardServices')
	.factory('ContactService', function($resource, configuration) {
		return $resource(configuration.apiRootURL + 'api/v1/contacts/:contactId',
			{ },
			{
				findByHashCode: {
					method: 'POST',
					params: { contactId: 'findByHashCode' }
				},
				getUserContacts: {
					method: 'POST',
					params: { contactId: 'getUserContacts' },
					isArray: true,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				},
				getUserConnections: {
					method: 'POST',
					params: { contactId: 'getUserConnections' },
					isArray: true,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				},
				getUserConnection: {
					method: 'POST',
					params: { contactId: 'getUserConnection' }
				},
				getCoWorkers: {
					method: 'POST',
					params: { contactId: 'getCoWorkers' },
					isArray: true,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				},
				getCoWorker: {
					method: 'POST',
					params: { contactId: 'getCoWorker' }
				},
				get: {
					method: 'GET'
				},
				create: {
					method: 'POST'
				},
				update: {
					params: { contactId: '@id' },
					method: 'PUT'
				},
				delete: {
					method: 'DELETE'
				},
				addConnection: {
					method: 'POST',
					params: { contactId: 'addConnection' },
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				},
				addMutualConnection: {
					method: 'POST',
					params: { contactId: 'addMutualConnection' }
				},
				addMutualConnectionWithTemporaryUser: {
					method: 'POST',
					params: { contactId: 'addMutualConnectionWithTemporaryUser' }
				},
				addCoWorker: {
					method: 'POST',
					params: { contactId: 'addCoWorker' },
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				},
				removeConnection: {
					method: 'POST',
					params: { contactId: 'removeConnection' },
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				},
				removeCoWorker: {
					method: 'POST',
					params: { contactId: 'removeCoWorker' },
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				}
			}
		);
	});
