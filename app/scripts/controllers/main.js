'use strict';

/**
 * @ngdoc function
 * @name freshcardUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the freshcardUiApp
 */
angular.module('freshcardUiApp')
.controller('MainCtrl', function ($scope, $rootScope, $location, $localStorage) {
	if ($rootScope.authError === 401) {
		$location.path('/login');
	}

  	var today = new Date();
	$scope.currentYear = today.getFullYear();

	$scope.$storage = $localStorage;
	
	var language = window.navigator.userLanguage || window.navigator.language;
	if (language.substring(0, 2) === 'de') {
		language = 'en_UK';
	}
	if (language.substring(0, 2) === 'en') {
		language = 'en_UK';
	}
	if (!$scope.$storage.languageChangedByUser) {
		$scope.changeLanguage(language);
	}

	$rootScope.accountConfirmed = false;
});
