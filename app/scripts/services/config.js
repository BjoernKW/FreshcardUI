'use strict';

angular.module('services.config', [])
	.constant('configuration', {
		apiRootURL: '../',
		useAuthTokenHeader: 'true',
		algoliaContactSearchIndex: 'freshcard_contacts'
	});

angular.module('freshcardServices', ['ngResource', 'services.config']);
angular.module('freshcardDirectives', []);
angular.module('freshcardFilters', []);
