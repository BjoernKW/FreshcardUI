'use strict';

/**
 * @ngdoc function
 * @name freshcardUiApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the freshcardUiApp
 */
angular.module('freshcardUiApp')
.controller('ProfileCtrl', function (
	$scope,
	$rootScope,
	FileUploader,
	VCardService,
	UserService,
	ContactService,
	configuration
) {
	$scope.changeMapCenter = function (center) {
		$scope.mapCenter = center;
	};

	$scope.updateCustomSignature = function() {
		UserService.update(
			{
				id: $scope.user.id,
				customSignature: $scope.user.customSignature,
				username: $scope.user.name
			},
			function() {
				$scope.customSignatureUpdated = true;
			},
			function() {
				$scope.customSignatureUpdateFailed = true;
			}
		);
	};

	$scope.shouldContactInfoBeDisplayed = function(entry) {
		return VCardService.shouldContactInfoBeDisplayed(entry);
	};

	$scope.lengthOfHash = function(hash) {
		return Object.keys(hash).length;
	};

	var getProfileVCards = function(user, profileVCards) {
		var mapCenter;

		for (var i = 0; i < user.ownContacts.length; i++) {
			user.ownContacts[i].vcard = angular.fromJson(user.ownContacts[i].vcard);
			profileVCards[i] = VCardService.parseData(user.ownContacts[i].vcard);
			profileVCards[i].hashCode = user.ownContacts[i].hashCode;
		}
		
		if ($scope.user.ownContacts.length > 0) {
			mapCenter = $scope.profileVCards[0][5].value[0];
		}

		return { 'mapCenter': mapCenter };
	};

	$scope.configuration = configuration;
	$scope.hashCode = $scope.user.hashCode;
	$scope.isPublic = false;

	$scope.profileVCards = [ ];
	$scope.mapCenter = getProfileVCards($scope.user, $scope.profileVCards);

	var uploader = $scope.uploader = new FileUploader(
		{
			url: configuration.apiRootURL + 'api/v1/users/uploadVCards/' + $rootScope.user.id,
			headers: {
				'X-Auth-Token': $rootScope.authToken
			}
		}
	);

	uploader.onAfterAddingFile = function() {
		$scope.completed = false;
	};

	uploader.onCompleteItem = function(fileItem, response) {
		if (response.numberOfImportedVCards > 0) {
			ContactService.getUserContacts(
				$.param(
					{
						userId: $rootScope.user.id,
						organizationId: $rootScope.user.currentOrganizationId
					}
				),
				function(contacts) {
					$rootScope.user.ownContacts = contacts;
					$scope.mapCenter = getProfileVCards($scope.user, $scope.profileVCards);
				}
			);

			$scope.completed = true;
		}
	};

	var imageUploader = $scope.imageUploader = new FileUploader(
		{
			url: configuration.apiRootURL + 'api/v1/users/uploadProfilePicture/' + $rootScope.user.id,
			headers: {
				'X-Auth-Token': $rootScope.authToken
			}
		}
	);

	imageUploader.onAfterAddingFile = function(fileItem) {
		$scope.imageUploadCompleted = false;
		$scope.imageUploading = true;

		if (fileItem.file.size < 5242880 && fileItem.file.type.indexOf('image/') > -1) {
			fileItem.upload();
		} else {
			$scope.imageUploading = false;
			$scope.imageUploadFailed = true;
		}
	};

	imageUploader.onCompleteItem = function(fileItem, response) {
		if (response.imagePath !== null && response.imagePath !== undefined) {
			$scope.user.profilePicturePath = response.imagePath;
			$scope.profileVCards[0][9].value = response.imagePath;

			for (var i = 0; i < $rootScope.user.ownContacts[0].vcard[1].length; i++) {
				if ($rootScope.user.ownContacts[0].vcard[1][i][0] === 'photo') {
					$rootScope.user.ownContacts[0].vcard[1][i][3] = response.imagePath;
				}
			}
			var vCards = [ ];
			for (var contactsIndex = 0; contactsIndex < $rootScope.user.ownContacts.length; contactsIndex++) {
				vCards.push(angular.toJson($rootScope.user.ownContacts[contactsIndex].vcard));
			}
			UserService.updateVCards(
				{
					userId: $rootScope.user.id,
					vcards: vCards
				}
			);

			$scope.imageUploadCompleted = true;
			$scope.imageUploading = false;
			$scope.imageUploadFailed = false;
		}
	};

	$scope.propagateChange = function(key, element, vCardIndex, entryIndex, itemIndex) {
		if ($scope.profileVCards[vCardIndex][entryIndex].value.constructor === Array) {
			$scope.profileVCards[vCardIndex][entryIndex].value[itemIndex] = element;
		} else {
			$scope.profileVCards[vCardIndex][entryIndex].value = element;
		}

		var vCards = [ ];
		var j = 0;
		var match = false;
		for (var i = 0; i < $rootScope.user.ownContacts[vCardIndex].vcard[1].length; i++) {
			if ($rootScope.user.ownContacts[vCardIndex].vcard[1][i][0] === key) {
				if (j === itemIndex || itemIndex === undefined || itemIndex === null) {
					$rootScope.user.ownContacts[vCardIndex].vcard[1][i][3] = element;
					match = true;
					break;
				} else {
					j++;
				}
			}
		}
		if (!match) {
			$rootScope.user.ownContacts[vCardIndex].vcard[1].push([key, {}, 'text', element]);
		}

		vCards.push(angular.toJson($rootScope.user.ownContacts[vCardIndex].vcard));
		UserService.updateVCards(
			{
				userId: $rootScope.user.id,
				vcards: vCards
			}
		);
	};
});
