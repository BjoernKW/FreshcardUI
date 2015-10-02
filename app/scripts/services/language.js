'use strict';

angular.module('freshcardServices')
	.factory('LanguageService', function($translate) {
		return {
			changeLanguage: function (key) {
				$translate.use(key);
			}
		};
	});
