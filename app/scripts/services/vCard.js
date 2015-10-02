'use strict';

angular.module('freshcardServices')
	.factory('VCardService', function() {
		return {
			parseData: function (vcard) {
				var removeEmptyElements = function(array) {
					var cleanedArray = [ ];

					for (var i = 0; i < array.length; i++) {
						if (array[i] !== '' && array[i] !== undefined && array[i] !== null) {
							cleanedArray.push(array[i]);
						}
					}

					return cleanedArray;
				};

				var vcardData = [ ];
				var emailAddresses = [ ];
				var phoneNumbers = [ ];
				var urls = [ ];
				var addresses = [ ];
				var organizations = [ ];
				var socialProfiles = { };

				vcardData[0] = { key: 'fn', value: null, isArray: false };
				vcardData[1] = { key: 'title', value: null, isArray: false };
				vcardData[2] = { key: 'org', value: null, isArray: true };
				vcardData[3] = { key: 'email', value: null, isArray: true };
				vcardData[4] = { key: 'tel', value: null, isArray: true };
				vcardData[5] = { key: 'adr', value: null, isArray: true };
				vcardData[6] = { key: 'url', value: null, isArray: true };
				vcardData[7] = { key: 'note', value: null, isArray: false };
				vcardData[8] = { key: 'categories', value: null, isArray: false };
				vcardData[9] = { key: 'photo', value: null, isArray: false };
				vcardData[10] = { key: 'socialProfile', value: null, isArray: false };
				vcardData[11] = { key: 'x-github', value: null, isArray: false };
				vcardData[12] = { key: 'x-linkedin', value: null, isArray: false };
				vcardData[13] = { key: 'x-twitter', value: null, isArray: false };
				vcardData[14] = { key: 'x-xing', value: null, isArray: false };

				var name = '';

				for (var j = 0; j < vcard[1].length; j++) {
					if (vcard[1][j][0] === 'fn') {
						vcardData[0] = { key: 'fn', value: vcard[1][j][3], isArray: false };
					}
					if (vcard[1][j][0] === 'n') {
						name = vcard[1][j][3][1] + ' ' + vcard[1][j][3][0];
					}
					if (vcard[1][j][0] === 'org') {
						if( Object.prototype.toString.call(vcard[1][j][3]) === '[object Array]' ) {
							organizations.push(removeEmptyElements(vcard[1][j][3]).join(', ').replace(/,$/, ''));
						} else {
							organizations.push(vcard[1][j][3]);
						}
					}
					if (vcard[1][j][0] === 'title') {
						vcardData[1] = { key: 'title', value: vcard[1][j][3], isArray: false };
					}
					if (vcard[1][j][0] === 'email') {
						emailAddresses.push(vcard[1][j][3]);
					}
					if (vcard[1][j][0] === 'tel') {
						phoneNumbers.push(vcard[1][j][3]);
					}
					if (vcard[1][j][0] === 'url') {
						urls.push(vcard[1][j][3]);
					}
					if (vcard[1][j][0] === 'adr') {
						addresses.push(removeEmptyElements(vcard[1][j][3]).join(', ').replace(/,$/, ''));
					}
					if (vcard[1][j][0] === 'note') {
						vcardData[7] = { key: 'note', value: vcard[1][j][3], isArray: false };
					}
					if (vcard[1][j][0] === 'categories') {
						vcardData[8] = { key: 'categories', value: vcard[1][j][3], isArray: false };
					}
					if (vcard[1][j][0] === 'photo') {
						vcardData[9] = { key: 'photo', value: vcard[1][j][3], isArray: false };
					}

					var socialNetworkAddressValue;
					if (vcard[1][j][0] === 'x-github' || (vcard[1][j][0] === 'x-socialprofile' && vcard[1][j][1].type === 'github')) {
						socialNetworkAddressValue = vcard[1][j][3].indexOf('http') === 0 ? vcard[1][j][3] : 'https://github.com/' + vcard[1][j][1].username;
						vcardData[11] = { key: 'x-github', value: socialNetworkAddressValue, isArray: false };
					}
					if (vcard[1][j][0] === 'x-linkedin' || (vcard[1][j][0] === 'x-socialprofile' && vcard[1][j][1].type === 'linkedin')) {
						vcardData[12] = { key: 'x-linkedin', value: vcard[1][j][3], isArray: false };
					}
					if (vcard[1][j][0] === 'x-twitter' || (vcard[1][j][0] === 'x-socialprofile' && vcard[1][j][1].type === 'twitter')) {
						socialNetworkAddressValue = vcard[1][j][3].indexOf('http') === 0 ? vcard[1][j][3] : 'https://twitter.com/' + vcard[1][j][1].username;
						vcardData[13] = { key: 'x-twitter', value: socialNetworkAddressValue, isArray: false };
					}
					if (vcard[1][j][0] === 'x-xing' || (vcard[1][j][0] === 'x-socialprofile' && vcard[1][j][1].type === 'xing')) {
						vcardData[14] = { key: 'x-xing', value: vcard[1][j][3], isArray: false };
					}

					var socialProfileKeys = [ 'x-github', 'x-linkedin', 'x-twitter', 'x-xing', 'x-socialprofile' ];
					if (socialProfileKeys.indexOf(vcard[1][j][0]) > -1) {
						var type;
						if (vcard[1][j][0] === 'x-github' || (vcard[1][j][0] === 'x-socialprofile' && vcard[1][j][1].type === 'github')) {
							type = 'x-github';
						}
						if (vcard[1][j][0] === 'x-linkedin' || (vcard[1][j][0] === 'x-socialprofile' && vcard[1][j][1].type === 'linkedin')) {
							type = 'x-linkedin';
						}
						if (vcard[1][j][0] === 'x-twitter' || (vcard[1][j][0] === 'x-socialprofile' && vcard[1][j][1].type === 'twitter')) {
							type = 'x-twitter';
						}
						if (vcard[1][j][0] === 'x-xing' || (vcard[1][j][0] === 'x-socialprofile' && vcard[1][j][1].type === 'xing')) {
							type = 'x-xing';
						}
						if (type === 'x-github') {
							socialNetworkAddressValue = vcard[1][j][3].indexOf('http') === 0 ? vcard[1][j][3] : 'https://github.com/' + vcard[1][j][1].username;
							socialProfiles[type] = socialNetworkAddressValue;
							type = null;
						}
						if (type === 'x-linkedin') {
							socialNetworkAddressValue = vcard[1][j][3].indexOf('http') === 0 ? vcard[1][j][3] : vcard[1][j][1].profile_url;
							socialProfiles[type] = socialNetworkAddressValue;
							type = null;
						}
						if (type === 'x-twitter') {
							socialNetworkAddressValue = vcard[1][j][3].indexOf('http') === 0 ? vcard[1][j][3] : 'https://twitter.com/' + vcard[1][j][1].username;
							socialProfiles[type] = socialNetworkAddressValue;
							type = null;
						}
						if (type === 'x-xing') {
							socialNetworkAddressValue = vcard[1][j][3].indexOf('http') === 0 ? vcard[1][j][3] : vcard[1][j][1].profile_url;
							socialProfiles[type] = socialNetworkAddressValue;
							type = null;
						}
					}
				}

				vcardData[2] = { key: 'org', value: organizations, isArray: true };
				vcardData[3] = { key: 'email', value: emailAddresses, isArray: true };
				vcardData[4] = { key: 'tel', value: phoneNumbers, isArray: true };
				vcardData[5] = { key: 'adr', value: addresses, isArray: true };
				vcardData[6] = { key: 'url', value: urls, isArray: true };
				vcardData[10] = { key: 'socialProfile', value: socialProfiles, isArray: true };

				if (vcardData[0].value === null) {
					vcardData[0].value = name;
				}

				vcardData[11] = this.getName(vcardData);

				return vcardData;
			},
			shouldContactInfoBeDisplayed: function (entry) {
				var displayContactInfo = false;
				var contactInfoToDisplay = [ 'email', 'tel', 'fn', 'socialProfile' ];

				if(contactInfoToDisplay.indexOf(entry.key) > -1) {
					displayContactInfo = true;
				}

				return displayContactInfo;
			},
			getName: function(vCardData) {
				var separator = '';
				var name = vCardData[0].value + ' ';
				if (name !== ' ') {
					separator = '- ';
				}

				if (vCardData[2].value[0] !== undefined) {
					name += separator + vCardData[2].value[0];
				} else {
					if (vCardData[3].value[0] !== undefined && vCardData[3].value[0] !== null && vCardData[3].value[0] !== '') {
						name += separator + vCardData[3].value[0];
					}
				}

				return name;
			}
		};
	});
