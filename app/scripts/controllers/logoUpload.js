'use strict';

/**
 * @ngdoc function
 * @name freshcardUiApp.controller:LogoUploadCtrl
 * @description
 * # LogoUploadCtrl
 * Controller of the freshcardUiApp
 */
angular.module('freshcardUiApp')
.controller('LogoUploadCtrl', function (
	$scope,
	$rootScope,
	$filter,
	$localStorage,
	$timeout,
	OrganizationService,
	FileUploader,
	configuration
) {
	var lastX;
	var lastY;

	var track = function() {
		$scope.canvas.on('mouse:up', function(event) {
			lastX = event.e.layerX;
			lastY = event.e.layerY;
		});

		$scope.canvas.on('object:added', function(options) {
			$scope.templateLayout.fields[$scope.fieldMappings[options.target.text]] = {
				left: options.target.left,
				top: options.target.top
			};
		});

		$scope.canvas.on('object:removed', function(options) {
			delete $scope.templateLayout.fields[$scope.fieldMappings[options.target.text]];
		});
	};

	var initialize = function() {
		$scope.canvas = new fabric.Canvas('logoCanvas', { selection: false });

		track();

		var snapToGridBlockSize = 5;
		$scope.canvas.on('object:moving', function(options) {
			if ($scope.snapToGrid) {
				options.target.set({
					left: Math.round(options.target.left / snapToGridBlockSize) * snapToGridBlockSize,
					top: Math.round(options.target.top / snapToGridBlockSize) * snapToGridBlockSize
				});
			}

			$scope.templateLayout.fields[$scope.fieldMappings[options.target.text]] = {
				left: options.target.left,
				top: options.target.top
			};
		});

		fabric.Image.fromURL($scope.logoImagePath, function(logo) {
			logo.lockUniScaling = logo.centeredScaling = true;
			logo.hasControls = logo.hasBorders = false;
			logo.left = logo.top = 20;

			logo.scaleToWidth(200);

			$scope.canvas.add(logo);
			$scope.canvas.sendToBack(logo);
		});

		var savePositionFixes = false;
		for (var i = 0; i < $scope.fieldMappings.length; i++) {
			var field = $scope.templateLayout.fields[$scope.fieldMappings[$scope.fieldMappings[i]]];
			canvasFields[i] = new fabric.Text(
				$scope.fieldMappings[i],
				{ 
					left: field && field.left ? field.left : $scope.fieldPositions[i][0],
					top: field && field.top ? field.top : $scope.fieldPositions[i][1],
					fontSize: $scope.fontSize,
					fontWeight: 300,
					fontFamily: $scope.font,
					fill: '#333', 
					originX: 'left', 
					originY: 'top',
				}
			);
			canvasFields[i].hasControls = canvasFields[i].hasBorders = false;

			// fix wrong alignments
			if (i !== 0 && canvasFields[i].top === canvasFields[i - 1].top) {
				canvasFields[i].top = $scope.fieldPositions[i][1];

				savePositionFixes = true;
			}

			$scope.templateLayout.fields[$scope.fieldMappings[i]] = {
				left: canvasFields[i].left,
				top: canvasFields[i].top
			};

			$scope.canvas.add(canvasFields[i]);

			canvasFields[i].setFontFamily($scope.selectedFont);
			canvasFields[i].setFontSize($scope.selectedFontSize);
		}

		// fix wrong alignments
		if (canvasFields[4].left === canvasFields[3].left) {
			$scope.canvas.remove(canvasFields[4]);
			canvasFields[4].left = $scope.fieldPositions[4][0];
			$scope.canvas.add(canvasFields[4]);

			$scope.templateLayout.fields[$scope.fieldMappings[4]] = {
				left: canvasFields[4].left,
				top: canvasFields[4].top
			};

			savePositionFixes = true;
		}

		if (savePositionFixes) {
			$scope.saveTemplate();
		}

		$scope.canvas.renderAll();
	};

	var imageUploader = $scope.imageUploader = new FileUploader(
		{
			url: configuration.apiRootURL + 'api/v1/organizations/uploadLogoImage/' + $rootScope.user.currentOrganizationId,
			headers: {
				'X-Auth-Token': $rootScope.authToken
			}
		}
	);

	imageUploader.onAfterAddingFile = function(fileItem) {
		$scope.imageUploadCompleted = false;
		fileItem.upload();
	};

	imageUploader.onCompleteItem = function(fileItem, response) {
		if (response.imagePath !== null && response.imagePath !== undefined) {
			$scope.logoImagePath = $localStorage.currentOrganizationLogo = $rootScope.currentOrganizationLogo = response.imagePath;
			$scope.imageUploadCompleted = true;

			initialize();
		}
	};

	$scope.saveTemplate = function() {
		$scope.templateLayout.font = $scope.selectedFont;
		$scope.templateLayout.fontSize = $scope.selectedFontSize;

		var svgResult = $scope.canvas.toSVG();
		for (var i = 0; i < $scope.fieldMappings.length; i++) {
			svgResult = svgResult.replace($scope.fieldMappings[i], $scope.fieldNames[i]);
		}
		$scope.templateLayout.fields = $scope.canvas;

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



	if ($rootScope.currentOrganizationLogo) {
		$scope.logoImagePath = $rootScope.currentOrganizationLogo;
	}
	$scope.fields = [ true, true, true, true, true, true, true ];
	$scope.fieldPositions = [
		[ 250, 150 ],
		[ 250, 210 ],
		[ 250, 170 ],
		[ 250, 190 ],
		[ 310, 190 ],
		[ 250, 230 ],
		[ 250, 250 ]
	];
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
		$filter('translate')('POSTAL_CODE_ABBR'),
		$filter('translate')('CITY'),
		$filter('translate')('PHONE_NUMBER'),
		$filter('translate')('WEBSITE')
	];

	$scope.showGrid = false;
	$scope.snapToGrid = true;

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

				$scope.fields = [ true, true, true, true, true, true, true ];

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

	var canvasFields = { };
	for (var i = 0; i < $scope.fields.length; i++) {
		canvasFields[i] = null;
	}

	$scope.logoImagePath = $localStorage.currentOrganizationLogo;

	initialize();

	$scope.$watch(
		'fields',
		function(newValue, oldValue) {
			if (oldValue !== newValue) {
				for (var i = 0; i < newValue.length; i++) {
					if (oldValue[i] !== newValue[i]) {
						if (newValue[i]) {
							var field = $scope.templateLayout.fields[$scope.fieldMappings[$scope.fieldMappings[i]]];
							
							canvasFields[i] = new fabric.Text(
								$scope.fieldMappings[i],
								{ 
									left: field && field.left ? field.left : $scope.fieldPositions[i][0],
									top: field && field.top ? field.top : $scope.fieldPositions[i][1],
									fontSize: $scope.fontSize,
									fontWeight: 300,
									fontFamily: $scope.font,
									fill: '#333', 
									originX: 'left', 
									originY: 'top',
								}
							);
							canvasFields[i].hasControls = canvasFields[i].hasBorders = false;

							$scope.canvas.add(canvasFields[i]);

							canvasFields[i].setFontFamily($scope.selectedFont);
							canvasFields[i].setFontSize($scope.selectedFontSize);
						} else {
							if (canvasFields[i] !== null && canvasFields[i] !== undefined) {
								canvasFields[i].remove();
							}
						}
					}
				}

				$scope.canvas.renderAll();
			}
		},
		true
	);
});
