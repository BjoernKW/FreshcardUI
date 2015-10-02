'use strict';

/**
 * @ngdoc function
 * @name freshcardUiApp.controller:TemplatesCtrl
 * @description
 * # TemplatesCtrl
 * Controller of the freshcardUiApp
 */
angular.module('freshcardUiApp')
.controller('TemplatesCtrl', function (
	$scope,
	$rootScope,
	$localStorage,
	$filter,
	$timeout,
	FileUploader,
	OrganizationService,
	configuration
) {
	$scope.templateLayoutSaved = false;
	$scope.templateLayoutError = false;

	$scope.templateLayoutPublished = false;
	$scope.templateLayoutPublishError = false;

	$scope.templateImagePath = $rootScope.currentOrganizationTemplate;
	$scope.fields = [ false, false, false, false, false, false, false ];
	$scope.fieldNames = [
		'NAME',
		'EMAIL_ADDRESS',
		'STREET_ADDRESS',
		'POSTAL_CODE',
		'CITY',
		'PHONE_NUMBER',
		'WEBSITE'
	];
	$scope.fieldMappings = [
		$filter('translate')('NAME'),
		$filter('translate')('EMAIL_ADDRESS'),
		$filter('translate')('STREET_ADDRESS'),
		$filter('translate')('POSTAL_CODE'),
		$filter('translate')('CITY'),
		$filter('translate')('PHONE_NUMBER'),
		$filter('translate')('WEBSITE')
	];

	$scope.showGrid = false;
	$scope.snapToGrid = false;

	$scope.fonts = [ 'Helvetica Neue', 'Open Sans', 'Helvetica', 'Arial', 'Times New Roman' ];
	$scope.fontSizes = [ 14, 16, 18, 20, 24, 28 ];
	$scope.selectedFont = $scope.fonts[0];
	$scope.selectedFontSize = $scope.fontSizes[3];
	$scope.templateLayout = { fields: { }, font: $scope.selectedFont, fontSize: $scope.selectedFontSize, showGrid: $scope.showGrid, snapToGrid: $scope.snapToGrid };

	OrganizationService.get(
		{
			organizationId: $rootScope.user.currentOrganizationId
		},
		function(organization) {
			if (organization.templateLayout) {
				$scope.templateLayout = JSON.parse(organization.templateLayout);

				$scope.selectedFont = $scope.templateLayout.font;
				$scope.selectedFontSize = $scope.templateLayout.fontSize;

				$scope.fields = [ false, false, false, false, false, false, false ];

				for (var field in $scope.templateLayout.fields) {
					for (var i = 0; i < $scope.fieldMappings.length; i++) {
						if ($scope.fieldMappings[i] === $filter('translate')(field)) {
							$scope.fields[i] = true;
						}
					}
				}
			}
		}
	);

	var imageUploader = $scope.imageUploader = new FileUploader(
		{
			url: configuration.apiRootURL + 'api/v1/organizations/uploadTemplateImage/' + $rootScope.user.currentOrganizationId,
			headers: {
				'X-Auth-Token': $rootScope.authToken
			}
		}
	);

	imageUploader.onAfterAddingFile = function() {
		$scope.imageUploadCompleted = false;
	};

	imageUploader.onCompleteItem = function(fileItem, response) {
		if (response.imagePath !== null && response.imagePath !== undefined) {
			$scope.templateImagePath = $localStorage.currentOrganizationTemplate = $rootScope.currentOrganizationTemplate = response.imagePath;
			$scope.imageUploadCompleted = true;
		}
	};

	$scope.saveTemplate = function() {
		$scope.templateLayout.font = $scope.selectedFont;
		$scope.templateLayout.fontSize = $scope.selectedFontSize;

		var svgResult = $scope.canvas.toSVG();
		for (var i = 0; i < $scope.fieldMappings.length; i++) {
			svgResult = svgResult.replace($scope.fieldMappings[i], $scope.fieldNames[i]);
		}

		OrganizationService.update(
			{
				id: $rootScope.user.currentOrganizationId,
				templateLayout: JSON.stringify($scope.templateLayout),
				templateAsSVG: svgResult
			},
			function() {
				$scope.templateLayoutPublished = false;
				$scope.templateLayoutPublishError = false;
				$scope.templateLayoutSaved = true;
				$scope.templateLayoutError = false;

				$timeout(
					function() {
						$scope.templateLayoutSaved = false;
					},
					5000
				);
			},
			function() {
				$scope.templateLayoutPublished = false;
				$scope.templateLayoutPublishError = false;
				$scope.templateLayoutSaved = false;
				$scope.templateLayoutError = true;
			}
		);
	};

	$scope.publishTemplate = function() {
		OrganizationService.publishTemplate(
			{
				id: $rootScope.user.currentOrganizationId
			},
			function() {
				$scope.templateLayoutPublished = true;
				$scope.templateLayoutPublishError = false;
				$scope.templateLayoutSaved = false;
				$scope.templateLayoutError = false;

				$timeout(
					function() {
						$scope.templateLayoutPublished = false;
					},
					5000
				);
			},
			function() {
				$scope.templateLayoutPublished = false;
				$scope.templateLayoutPublishError = true;
				$scope.templateLayoutSaved = false;
				$scope.templateLayoutError = false;
			}
		);
	};
});
