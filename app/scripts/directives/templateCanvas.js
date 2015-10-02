'use strict';

/**
 * @ngdoc directive
 * @name freshcardUiApp.directive:templateCanvas
 * @description
 * # templateCanvas
 */
angular.module('freshcardUiApp')
	.directive('templateCanvas', function($filter) {
		return {
			restrict: 'A',
			scope: {
				template: '=ngTemplate',
				fields: '=ngFields',
				fieldMappings: '=ngFieldMappings',
				font: '=ngFont',
				fontSize: '=ngFontSize',
				showGrid: '=ngShowGrid',
				snapToGrid: '=ngSnapToGrid',
				layout: '=ngLayout'
			},
			link: function(scope, element) {
				var canvas = scope.$parent.canvas = new fabric.Canvas(element[0].id, { selection: false });

				var snapToGridBlockSize = 5;
	
				var gridBlockSize = 10;
				var verticalGridLines = { };
				var horizontalGridLines = { };
				for (var v = 0; v < (canvas.width / gridBlockSize); v++) {
					verticalGridLines[v] = null;
				}
				for (var h = 0; h < (canvas.height / gridBlockSize); h++) {
					horizontalGridLines[h] = null;
				}

				var toggleGridLines = function(showGrid) {
					var v;
					var h;
					if (showGrid) {
						for (v = 0; v < (canvas.width / gridBlockSize); v++) {
							verticalGridLines[v] = new fabric.Line([ v * gridBlockSize, 0, v * gridBlockSize, canvas.height], { stroke: '#ccc', selectable: false });
							canvas.add(verticalGridLines[v]);
						}
						for (h = 0; h < (canvas.height / gridBlockSize); h++) {
							horizontalGridLines[h] = new fabric.Line([ 0, h * gridBlockSize, canvas.width, h * gridBlockSize], { stroke: '#ccc', selectable: false });
							canvas.add(horizontalGridLines[h]);
						}
					} else {
						for (v = 0; v < (canvas.width / gridBlockSize); v++) {
							canvas.remove(verticalGridLines[v]);
						}
						for (h = 0; h < (canvas.height / gridBlockSize); h++) {
							canvas.remove(horizontalGridLines[h]);
						}
					}
				};

				var lastX;
				var lastY;

				var fieldMappings = { };
				fieldMappings[$filter('translate')('NAME')] = 'NAME';
				fieldMappings[$filter('translate')('EMAIL_ADDRESS')] = 'EMAIL_ADDRESS';
				fieldMappings[$filter('translate')('STREET_ADDRESS')] = 'STREET_ADDRESS';
				fieldMappings[$filter('translate')('POSTAL_CODE')] = 'POSTAL_CODE';
				fieldMappings[$filter('translate')('CITY')] = 'CITY';
				fieldMappings[$filter('translate')('PHONE_NUMBER')] = 'PHONE_NUMBER';
				fieldMappings[$filter('translate')('WEBSITE')] = 'WEBSITE';

				var initialize = function() {
					var image = new Image();
					image.onload = function() {
						var canvasElement = document.getElementById(element[0].id);
						canvasElement.width = image.width;
						canvasElement.height = image.height;

						canvas.setWidth(canvasElement.width);
						canvas.setHeight(canvasElement.height);
						canvas.calcOffset();
						
						setBackground(scope.template);
						setGrid();
						track();

						canvas.renderAll();
					};
					image.src = scope.template;
				};

				var setBackground = function(backgroundImagePath) {
					canvas.setBackgroundImage(backgroundImagePath, canvas.renderAll.bind(canvas));
				};

				var setGrid = function() {
					toggleGridLines(scope.showGrid);

					canvas.on('object:moving', function(options) {
						if (scope.snapToGrid) {
							options.target.set({
								left: Math.round(options.target.left / snapToGridBlockSize) * snapToGridBlockSize,
								top: Math.round(options.target.top / snapToGridBlockSize) * snapToGridBlockSize
							});
						}

						scope.layout.fields[fieldMappings[options.target.text]] = {
							left: options.target.left,
							top: options.target.top
						};
					});
				};

				var track = function() {
					canvas.on('mouse:up', function(event) {
						lastX = event.e.layerX;
						lastY = event.e.layerY;
					});

					canvas.on('object:added', function(options) {
						scope.layout.fields[fieldMappings[options.target.text]] = {
							left: options.target.left,
							top: options.target.top
						};
					});

					canvas.on('object:removed', function(options) {
						delete scope.layout.fields[fieldMappings[options.target.text]];
					});
				};

				initialize();

				scope.$watch(
					'template',
					function(newValue, oldValue) {
						if (oldValue !== newValue) {
							initialize();
						}
					},
					true
				);

				var canvasFields = { };
				for (var i = 0; i < scope.fields.length; i++) {
					canvasFields[i] = null;
				}

				scope.$watch(
					'fields',
					function(newValue, oldValue) {
						if (oldValue !== newValue) {
							for (var i = 0; i < newValue.length; i++) {
								if (oldValue[i] !== newValue[i]) {
									if (newValue[i]) {
										var field = scope.layout.fields[fieldMappings[scope.fieldMappings[i]]];
										
										canvasFields[i] = new fabric.Text(
											scope.fieldMappings[i],
											{ 
												left: field && field.left ? field.left : 10 + i * 20,
												top: field && field.top ? field.top : 10 + i * 20,
												fontSize: scope.fontSize,
												fontWeight: 300,
												fontFamily: scope.font,
												fill: '#333', 
												originX: 'left', 
												originY: 'top',
											}
										);
										canvas.add(canvasFields[i]);
									} else {
										if (canvasFields[i] !== null && canvasFields[i] !== undefined) {
											canvasFields[i].remove();
										}
									}
								}
							}

							canvas.renderAll();
						}
					},
					true
				);

				scope.$watch(
					'font',
					function(newValue, oldValue) {
						if (oldValue !== newValue) {
							for (var i = 0; i < scope.fields.length; i++) {
								if (canvasFields[i] !== null && canvasFields[i] !== undefined) {
									canvasFields[i].setFontFamily(newValue);
								}
							}

							canvas.renderAll();
						}
					},
					true
				);

				scope.$watch(
					'fontSize',
					function(newValue, oldValue) {
						if (oldValue !== newValue) {
							for (var i = 0; i < scope.fields.length; i++) {
								if (canvasFields[i] !== null && canvasFields[i] !== undefined) {
									canvasFields[i].setFontSize(newValue);
								}
							}

							canvas.renderAll();
						}
					},
					true
				);

				scope.$watch(
					'showGrid',
					function(newValue, oldValue) {
						if (oldValue !== newValue) {
							toggleGridLines(newValue);

							canvas.renderAll();
						}
					},
					true
				);
			}
		};
	});
