'use strict';

angular.module('freshcardServices')
	.factory('UserService', function($resource, configuration) {
		return $resource(configuration.apiRootURL + 'api/v1/users/:action',
			{ },
			{
				authenticate: {
					method: 'POST',
					params: { 'action': 'authenticate' },
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				},
				authenticateViaOAuth: {
					method: 'POST',
					params: { 'action': 'authenticateViaOAuth' },
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				},
				update: {
					params: { action: '@id' },
					method: 'PUT'
				},
				delete: {
					params: { action: '@id' },
					method: 'DELETE'
				},
				updateCurrentOrganization: {
					params: { action: 'updateCurrentOrganization' },
					method: 'POST'
				},
				findByHashCode: {
					method: 'POST',
					params: { action: 'findByHashCode' }
				},
				findByUsername: {
					method: 'POST',
					params: { action: 'findByUsername' }
				},
				sendPasswordResetLink: {
					method: 'POST',
					params: { action: 'sendPasswordResetLink' }
				},
				changePassword: {
					method: 'POST',
					params: { action: 'changePassword' }
				},
				create: {
					method: 'POST'
				},
				signUp: {
					method: 'POST',
					params: { action: 'signUp' }
				},
				signUpExistingUser: {
					method: 'POST',
					params: { action: 'signUpExistingUser' }
				},
				checkByUsername: {
					method: 'POST',
					params: { action: 'checkByUsername' }
				},
				confirmAccount: {
					method: 'POST',
					params: { action: 'confirmAccount' }
				},
				updatePassword: {
					params: { action: 'updatePassword' },
					method: 'POST'
				},
				updateUsername: {
					params: { action: 'updateUsername' },
					method: 'POST'
				},
				get: {
					method: 'GET'
				},
				sendEMailConnectionRequest: {
					params: { action: 'sendEMailConnectionRequest' },
					method: 'POST',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				},
				addCoWorkerViaEMail: {
					params: { action: 'addCoWorkerViaEMail' },
					method: 'POST'
				},
				updateVCards: {
					params: { action: 'updateVCards' },
					method: 'POST'
				}
			}
		);
	});
