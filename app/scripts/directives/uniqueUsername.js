'use strict';

angular.module('freshcardDirectives')
	.directive('uniqueUsername', ['UserService', function(UserService) {
		return {
			require: 'ngModel',
			link: function(scope, elem, attrs, ctrl) {
				scope.busy = false;

				scope.$watch(attrs.ngModel, function(value) {
					ctrl.$setValidity('isTaken', true);

					if (!value || value.length < 3) {
						return;
					}

					scope.busy = true;

					UserService.checkByUsername(
						value,
						function() {
							scope.busy = false;
						},
						function(error) {
							if (error.status === 403) {
								ctrl.$setValidity('isTaken', false);
							}

							scope.busy = false;
						}
					);
				});
			}
		};
	}]);
	