'use strict';

angular.module('freshcardFilters')
	.filter('linkyTel', ['$sanitize', function($sanitize) {
		var LINKY_TEL_US_REGEXP = /(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}/gim;
		var LINKY_TEL_EUR_REGEXP = /^((\+|00)[1-9]\d{0,3}|0\s?[1-9]|\(00?\s?[1-9][\d\s]*\))[\d-\/\s]*$/gim;

		return function(text, target) {
			function addText(text) {
				if (!text) {
					return;
				}
				html.push($sanitize(text));
			}

			function addLink(url, text) {
				html.push('<a ');
				if (angular.isDefined(target)) {
					html.push('target="');
					html.push(target);
					html.push('" ');
				}
				html.push('href="');
				html.push(url);
				html.push('">');
				addText(text);
				html.push('</a><br>');
			}

			if (!text) {
				return text;
			}

			var raw = text;
			var html = [];
			var url;

			raw = raw.replace(/&#160;/gim, ' ');

			var matches = raw.match(LINKY_TEL_US_REGEXP);
			var i = 0;
			if (matches !== null) {
				for (i = 0; i < matches.length; i++) {
					url = 'tel:' + matches[i];
					addLink(url, matches[i]);
				}
			} else {
				matches = raw.match(LINKY_TEL_EUR_REGEXP);
				if (matches !== null) {
					for (i = 0; i < matches.length; i++) {
						url = 'tel:' + matches[i];
						addLink(url, matches[i]);
					}
				} else {
					addText(raw);
				}
			}

			return $sanitize(html.join(''));
		};
	}]);
