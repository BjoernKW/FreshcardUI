'use strict';

angular.module('services.config', [])
	.constant('configuration', {
		apiRootURL: '@@apiRootURL',
		useAuthTokenHeader: '@@useAuthTokenHeader',
		algoliaContactSearchIndex: '@@algoliaContactSearchIndex'
	});

angular.module('freshcardServices', ['ngResource', 'services.config']);
angular.module('freshcardDirectives', []);
angular.module('freshcardFilters', []);
