'use strict';

/**
 * @ngdoc overview
 * @name freshcardUiApp
 * @description
 * # freshcardUiApp
 *
 * Main module of the application.
 */
angular
  .module('freshcardUiApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pascalprecht.translate',
    'ui.select2',
    'ui.bootstrap',
    'chieffancypants.loadingBar',
    'ngStorage',
    'ngMap',
    'angularFileUpload',
    'services.config',
    'freshcardServices',
    'freshcardDirectives',
    'freshcardFilters',
    'xeditable'
  ])
  .config(function ($routeProvider, $translateProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/contactUs', {
        templateUrl: 'views/contactUs.html',
        controller: 'ContactUsCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/public/signUp', {
        templateUrl: 'views/signUp.html',
        controller: 'SignUpCtrl'
      })
      .when('/public/changePassword/:hashCode', {
        templateUrl: 'views/changePassword.html',
        controller: 'ChangePasswordCtrl'
      })
      .when('/public/passwordForgotten', {
        templateUrl: 'views/passwordForgotten.html',
        controller: 'PasswordForgottenCtrl'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/public/oAuth/callback', {
        controller: 'OAuthCtrl'
      })
      .when('/public/profile/:hashCode/:connectionHashCode?', {
        templateUrl: 'views/publicProfile.html',
        controller: 'PublicProfileCtrl'
      })
      .when('/public/confirmAccount/:hashCode', {
        templateUrl: 'views/account.html',
        controller: 'ConfirmAccountCtrl'
      })
      .when('/account', {
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl'
      })
      .when('/organization/edit/:id', {
        templateUrl: 'views/editOrganization.html',
        controller: 'OrganizationCtrl'
      })
      .when('/organization/:id/coWorkers', {
        templateUrl: 'views/coWorkers.html',
        controller: 'CoWorkersCtrl'
      })
      .when('/organization/:id', {
        templateUrl: 'views/organization.html',
        controller: 'OrganizationCtrl'
      })
      .when('/contact/:id/:coWorkerUserId?', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/connections/:id', {
        templateUrl: 'views/connections.html',
        controller: 'ConnectionsCtrl'
      })
      .when('/directory', {
        templateUrl: 'views/directory.html',
        controller: 'DirectoryCtrl'
      })
      .when('/templates', {
        templateUrl: 'views/templates.html',
        controller: 'TemplatesCtrl'
      })
      .when('/reports', {
        templateUrl: 'views/reports.html',
        controller: 'ReportsCtrl'
      })
      .when('/administration', {
        templateUrl: 'views/administration.html',
        controller: 'AdministrationCtrl'
      })
      .when('/logoUpload', {
        templateUrl: 'views/logoUpload.html',
        controller: 'LogoUploadCtrl'
      })
      .when('/terms', {
        templateUrl: 'views/terms.html',
      })
      .when('/privacy', {
        templateUrl: 'views/privacy.html',
      })
      .otherwise({
        redirectTo: '/'
      });
    
    $translateProvider.translations('en_UK', {
      'FRESHCARD': 'Freshcard',
      'NAME': 'Name',
      'ORGANIZATION': 'organization',
      'ORGANIZATIONS': 'organizations',
      'USERNAME': 'Username',
      'PASSWORD': 'Password',
      'REMEMBER_ME': 'Remember me',
      'LOG_IN': 'Sign in',
      'LOGIN': 'Sign in',
      'HOME': 'Home',
      'ABOUT': 'About',
      'CONTACT': 'Contact',
      'CONTACT_US': 'Contact us',
      'LOG_OUT': 'Log out',
      'LOADING': 'Loading ...',
      'TOGGLE_NAVIGATION': 'Toggle navigation',
      'GETTING_STARTED': 'Getting started',
      'DESIGN_YOUR_FRESHCARD': 'Design your Freshcard',
      'YOUR_CO_WORKERS': 'Your co-workers',
      'YOUR_CONNECTIONS': 'Your connections',
      'COMPANIES': 'Companies',
      'GROUPS': 'Groups',
      'YOUR_COMPANY': 'Your company',
      'YOUR_FRESHCARD_LAYOUT': 'Your Freshcard layout',
      'YOUR_ADDRESS_BOOK': 'Your address book',
      'SHARING_AND_PRIVACY': 'Sharing and privacy',
      'CONNECTED_SERVICES': 'Connected services',
      'CONNECTED_DEVICES': 'Connected devices',
      'HELP': 'Help',
      'CONTACTS': 'Contacts',
      'SETTINGS': 'Settings',
      'EMAIL_ADDRESS': 'Email',
      'PROFILE': 'Profile',
      'EDIT_COMPANY': 'Edit your company',
      'IMPORT_ADDRESSES': 'Import addresses',
      'SET_UP_SHARING': 'Set up sharing',
      'SET_UP_DEVICES': 'Set up devices',
      'EDIT_COMPANY_DETAILS': 'Here you can edit your company details and general settings.',
      'DESIGN_YOUR_FRESHCARD_DETAILS': 'Designing your Freshcard allows you to add your own layout and corporate identity to the Freshcards shown to your contacts.',
      'IMPORT_ADDRESSES_DETAILS': 'Freshcard allows you to import your existing address book and use third party contact servers suchs CardDAV or Microsoft Exchange.',
      'SET_UP_SHARING_DETAILS': 'Tell Freshcard which information to share with your contacts.',
      'SET_UP_DEVICES_DETAILS': 'View, add or remove your mobile devices here.',
      'fn': 'Name',
      'n': 'Name',
      'org': 'Organizations',
      'title': 'Title',
      'email': 'Email addresses',
      'tel': 'Phone numbers',
      'adr': 'Addresses',
      'note': 'Notes',
      'categories': 'Categories',
      'url': 'URL',
      'socialProfile': 'Social profiles',
      'x-socialprofile': 'Social profile',
      'x-github': 'GitHub',
      'x-linkedin': 'LinkedIn',
      'x-twitter': 'Twitter',
      'x-xing': 'XING',
      'PUBLIC_PROFILE': 'public profile',
      'VCARD': 'vCard',
      'SIGN_UP': 'Register',
      'PASSWORD_FORGOTTEN': '(forgot your password?)',
      'PASSWORD_VERIFICATION': 'Repeat password',
      'ENTER_USERNAME': 'Please enter your Email address.',
      'ENTER_EMAIL_ADDRESS': 'Please enter an Email address.',
      'ENTER_NEW_USERNAME': 'Please enter an Email address.',
      'USERNAME_TAKEN': 'Username is already taken.',
      'EMAIL_ADDRESS_INVALID': 'Email address is invalid.',
      'ENTER_PASSWORD': 'Please enter your password.',
      'ENTER_NEW_PASSWORD': 'Please enter a password.',
      'PASSWORD_MISMATCH': 'Passwords do not match.',
      'AUTHENTICATION_FAILED': 'Username or password is wrong.',
      'ACCOUNT': 'Account',
      'CHANGE_PASSWORD': 'Change password',
      'CHANGE_USERNAME': 'Change username',
      'SEND_PASSWORD_RESET_LINK': 'Reset password',
      'PASSWORD_RESET_LINK_SENT': 'A password reset link has been sent to you via Email.',
      'ACCOUNT_CONFIRMED': 'Your account is now confirmed.',
      'PASSWORD_CHANGED': 'Your password has been changed. Please sign in again.',
      'USERNAME_CHANGED': 'Your username has been changed. Please sign in again.',
      'EDIT': 'Edit',
      'DELETE': 'Delete',
      'DELETE_CONFIRMATION': 'Are you sure?',
      'REMOVAL_CONFIRMATION': 'Are you sure?',
      'CANCEL': 'Cancel',
      'SUBMIT': 'Submit',
      'EDIT_ORGANIZATION': 'Edit organization',
      'ENTER_NAME': 'Please enter a name.',
      'ENTER_URL': 'Please enter a URL.',
      'URL_IS_INVALID': 'URL is invalid.',
      'URL': 'URL',
      'UPLOAD_VCARD_FILE': 'Upload vCard',
      'DROP_VCARD_HERE': 'Drop your vCard file here.',
      'PROGRESS': 'Progress',
      'SIZE': 'Size',
      'STATUS': 'Status',
      'TOTAL_PROGRESS': 'Total progress',
      'UPLOAD': 'Upload',
      'REMOVE': 'Remove',
      'UPLOAD_ALL': 'Upload all',
      'REMOVE_ALL': 'Remove all',
      'LOGIN_WITH': 'Login with',
      'PREVIOUS': 'Previous',
      'NEXT': 'Next',
      'FIRST': 'First',
      'LAST': 'Last',
      'ADD_FRESHCARD_USER': 'Add Freshcard user',
      'NEW_CONTACT': 'New contact',
      'DROP_CONTACT_VCARD_HERE': 'Drop your contact\'s vCard file here.',
      'ADDING_CONNECTION_FAILED': 'Contact cannot be added.',
      'ADDING_CONNECTION_SUCCESSFUL': 'Contact has been added.',
      'ADD_CO_WORKER': 'Add co-worker',
      'CONNECTION_REMOVED': 'Contact has been removed.',
      'EMAIL_SIGNATURE': 'Biography',
      'CUSTOM_SIGNATURE_UPDATED': 'Your bio has been updated.',
      'CUSTOM_SIGNATURE_UPDATE_FAILED': 'Your bio couldn\'t be updated.',
      'DIRECTORY': 'Directory',
      'TEMPLATES': 'Templates',
      'REPORTS': 'Reports',
      'ADMINISTRATION': 'Administration',
      'PROFILE_PICTURE': 'Profile picture',
      'UPLOAD_PROFILE_PICTURE': 'Upload profile picture',
      'DROP_IMAGE_HERE': 'Drop image file here.',
      'DROP_PROFILE_PICTURE_HERE': 'Drag profile picture here.',
      'PROFILE_PICTURE_MAX_DIMENSIONS': 'Recommended max dimensions: 1000 x 1000 pixels.',
      'PROFILE_PICTURE_HELP': 'Your profile picture will appear when you email your Freshcard, as well as on your public profile page.',
      'BIO_HELP': 'Your biography will appear when you email your Freshcard, as well as on your public profile page. Maximum 500 characters.',
      'SEE_AN_EXAMPLE': 'See an example',
      'UPLOAD_TEMPLATE_IMAGE': 'Upload background image',
      'STREET_ADDRESS': 'Street address',
      'POSTAL_CODE': 'Postal code',
      'CITY': 'City',
      'PHONE_NUMBER': 'Phone number',
      'WEBSITE': 'Website',
      'FONT': 'Font',
      'FONT_SIZE': 'Font size',
      'SAVE_TEMPLATE': 'Save template',
      'PUBLISH_TEMPLATE': 'Publish template',
      'TEMPLATE_LAYOUT_SAVED': 'Template was saved.',
      'TEMPLATE_LAYOUT_ERROR': 'Template could not be saved.',
      'TEMPLATE_LAYOUT_PUBLISHED': 'Template was published.',
      'TEMPLATE_LAYOUT_PUBLISH_ERROR': 'Template could not be published.',
      'ADD_NEW_FRESHCARD_USER': 'Add new user to Freshcard',
      'VIA': 'via',
      'MENU': 'Menu',
      'SEARCH': 'Search',
      'WELCOME': 'Welcome to Freshcard!',
      'DELETE_USER': 'Delete user',
      'CONFIRM_WITH_USERNAME': 'Enter username for confirmation',
      'USER_ID': 'User ID',
      'USER_REMOVED': 'User has been removed.',
      'USER_NOT_REMOVED': 'User could not be removed.',
      'NOTES': 'Notes',
      'SHOW_GRID': 'Show grid',
      'SNAP_TO_GRID': 'Snap to grid',
      'TERMS_OF_SERVICE': 'Terms of Service',
      'PRIVACY': 'Privacy Policy',
      'UPLOAD_LOGO': 'Upload logo',
      'POSTAL_CODE_ABBR': 'PC'
    });
    $translateProvider.translations('de_DE', {
      'FRESHCARD': 'Freshcard',
      'NAME': 'Name',
      'ORGANIZATION': 'Organisation',
      'ORGANIZATIONS': 'Organisationen',
      'USERNAME': 'Username',
      'PASSWORD': 'Passwort',
      'REMEMBER_ME': 'Angemeldet bleiben',
      'LOG_IN': 'Anmelden',
      'LOGIN': 'Anmeldung',
      'HOME': 'Home',
      'ABOUT': 'Über uns',
      'CONTACT': 'Kontakt',
      'CONTACT_US': 'Impressum',
      'LOG_OUT': 'Ausloggen',
      'LOADING': 'Loading ...',
      'TOGGLE_NAVIGATION': 'Navigation umschalten',
      'GETTING_STARTED': 'Start',
      'DESIGN_YOUR_FRESHCARD': 'Gestalten Sie Ihre Freshcard',
      'YOUR_CO_WORKERS': 'Ihre Kollegen',
      'YOUR_CONNECTIONS': 'Ihre Kontakte',
      'COMPANIES': 'Unternehmen',
      'GROUPS': 'Gruppen',
      'YOUR_COMPANY': 'Ihr Unternehmen',
      'YOUR_FRESHCARD_LAYOUT': 'Ihr Freshcard Layout',
      'YOUR_ADDRESS_BOOK': 'Ihr Adressbuch',
      'SHARING_AND_PRIVACY': 'Privatsphäre',
      'CONNECTED_SERVICES': 'Dienste',
      'CONNECTED_DEVICES': 'Geräte',
      'HELP': 'Hilfe',
      'CONTACTS': 'Kontakte',
      'SETTINGS': 'Einstellungen',
      'EMAIL_ADDRESS': 'Email',
      'PROFILE': 'Profil',
      'EDIT_COMPANY': 'Bearbeiten Sie Ihre Einstellungen',
      'IMPORT_ADDRESSES': 'Importieren Sie Ihre Adressen',
      'SET_UP_SHARING': 'Teilen Sie Ihre Daten',
      'SET_UP_DEVICES': 'Verwalten Sie Ihre Geräte',
      'EDIT_COMPANY_DETAILS': 'Hier können Sie Ihre allgeminen Einstellungen und Unternehmensdetails bearbeiten.',
      'DESIGN_YOUR_FRESHCARD_DETAILS': 'Ihr persönliches Freshcard Design ermöglicht Ihnen, Ihr eigenes Layout und Ihre Corporate Identity für Freshcards festzulegen.',
      'IMPORT_ADDRESSES_DETAILS': 'Freshcard erlaubt Ihnen, Ihr bestehendes Adressbuch zu importieren und externe Kontakt Server wie CardDAV oder Microsoft Exchange anzubinden.',
      'SET_UP_SHARING_DETAILS': 'Legen Sie fest, welche Informationen Freshcard mit Ihren Kontakten teilt.',
      'SET_UP_DEVICES_DETAILS': 'Fügen Sie Ihre mobilen Endgeräte hier hinzu.',
      'fn': 'Name',
      'n': 'Name',
      'org': 'Organisationen',
      'title': 'Titel',
      'email': 'Email Adressen',
      'tel': 'Telefonnummern',
      'adr': 'Adressen',
      'note': 'Notizen',
      'categories': 'Kategorien',
      'url': 'URL',
      'socialProfile': 'Soziale Netzwerke',
      'x-socialprofile': 'Soziales Netzwerk',
      'x-github': 'GitHub',
      'x-linkedin': 'LinkedIn',
      'x-twitter': 'Twitter',
      'x-xing': 'XING',
      'PUBLIC_PROFILE': 'öffentliches Profil',
      'VCARD': 'vCard',
      'SIGN_UP': 'Registrieren',
      'PASSWORD_FORGOTTEN': '(Passwort vergessen?)',
      'PASSWORD_VERIFICATION': 'Passwort wiederholen',
      'ENTER_USERNAME': 'Bitte geben Sie Ihre Email Adresse ein.',
      'ENTER_EMAIL_ADDRESS': 'Bitte geben Sie eine Email Adresse ein.',
      'ENTER_NEW_USERNAME': 'Bitte geben Sie eine Email Adresse ein.',
      'USERNAME_TAKEN': 'Nutzername ist bereits vergeben.',
      'EMAIL_ADDRESS_INVALID': 'Email Adresse ist ungültig.',
      'ENTER_PASSWORD': 'Bitte geben Sie Ihr Passwort ein.',
      'ENTER_NEW_PASSWORD': 'Bitte geben Sie ein Passwort ein.',
      'PASSWORD_MISMATCH': 'Passwörter stimmen nicht überein.',
      'AUTHENTICATION_FAILED': 'Benutzername oder Passwort ist fehlerhaft.',
      'ACCOUNT': 'Konto',
      'CHANGE_PASSWORD': 'Passwort ändern',
      'CHANGE_USERNAME': 'Nutzernamen ändern',
      'SEND_PASSWORD_RESET_LINK': 'Passwort zurück setzen',
      'PASSWORD_RESET_LINK_SENT': 'Ein Link zum Zurücksetzen Ihres Passworts wurde Ihnen per Email zugeschickt.',
      'ACCOUNT_CONFIRMED': 'Ihr Konto ist nun bestätigt.',
      'PASSWORD_CHANGED': 'Ihr Passwort wurde geändert. Bitte melden Sie sich erneut an.',
      'USERNAME_CHANGED': 'Ihr Nutzername wurde geändert. Bitte melden Sie sich erneut an.',
      'EDIT': 'Bearbeiten',
      'DELETE': 'Löschen',
      'DELETE_CONFIRMATION': 'Wirklich löschen?',
      'REMOVAL_CONFIRMATION': 'Wirklich entfernen?',
      'CANCEL': 'Abbrechen',
      'SUBMIT': 'Abschicken',
      'EDIT_ORGANIZATION': 'Organisation bearbeiten',
      'ENTER_NAME': 'Bitte geben Sie einen Namen ein.',
      'ENTER_URL': 'Bitte geben Sie eine URL ein.',
      'URL_IS_INVALID': 'Die URL ist ungültig.',
      'URL': 'URL',
      'UPLOAD_VCARD_FILE': 'vCard hochladen',
      'DROP_VCARD_HERE': 'Ziehen Sie Ihre vCard Datei hier hin.',
      'PROGRESS': 'Fortschritt',
      'SIZE': 'Größe',
      'STATUS': 'Status',
      'TOTAL_PROGRESS': 'Gesamtfortschritt',
      'UPLOAD': 'Hochladen',
      'REMOVE': 'Entfernen',
      'UPLOAD_ALL': 'Alle hochladen',
      'REMOVE_ALL': 'Alle entfernen',
      'LOGIN_WITH': 'Anmelden mit ',
      'PREVIOUS': 'Vor',
      'NEXT': 'Zurück',
      'FIRST': 'Anfang',
      'LAST': 'Ende',
      'ADD_FRESHCARD_USER': 'Freshcard Nutzer hinzufügen',
      'NEW_CONTACT': 'Neuer Kontakt',
      'DROP_CONTACT_VCARD_HERE': 'Ziehen Sie die vCard Datei Ihres Kontakts hier hin.',
      'ADDING_CONNECTION_FAILED': 'Kontakt kann nicht hinzugefügt werden.',
      'ADDING_CONNECTION_SUCCESSFUL': 'Kontakt wurde hinzugefügt.',
      'ADD_CO_WORKER': 'Mitarbeiter hinzufügen',
      'CONNECTION_REMOVED': 'Kontakt wurde entfernt.',
      'EMAIL_SIGNATURE': 'Biografie',
      'CUSTOM_SIGNATURE_UPDATED': 'Ihre Biografie wurde aktualisiert.',
      'CUSTOM_SIGNATURE_UPDATE_FAILED': 'Ihre Biografie konnte nicht aktualisiert werden.',
      'DIRECTORY': 'Verzeichnis',
      'TEMPLATES': 'Templates',
      'REPORTS': 'Reports',
      'ADMINISTRATION': 'Administration',
      'PROFILE_PICTURE': 'Profilbild',
      'UPLOAD_PROFILE_PICTURE': 'Profilbild hochladen',
      'DROP_IMAGE_HERE': 'Ziehen Sie Ihre Bilddatei hier hin.',
      'DROP_PROFILE_PICTURE_HERE': 'Ziehen Sie Ihr Profilbild hier hin.',
      'PROFILE_PICTURE_MAX_DIMENSIONS': 'Empfohlene Maximalgröße: 1000 x 1000 Pixel.',
      'PROFILE_PICTURE_HELP': 'Ihr Profilbild wird angezeigt, wenn Sie Ihre Freshcard per Email verschicken, ebenso auf Ihrer öffentlichen Profilseite.',
      'BIO_HELP': 'Ihre Biografie wird angezeigt, wenn Sie Ihre Freshcard per Email verschicken, ebenso auf Ihrer öffentlichen Profilseite. Maximal 500 Zeichen.',
      'SEE_AN_EXAMPLE': 'Beispiel',
      'UPLOAD_TEMPLATE_IMAGE': 'Hintergrund hochladen',
      'STREET_ADDRESS': 'Straße / Hausnummer',
      'POSTAL_CODE': 'Postleitzahl',
      'CITY': 'Stadt',
      'PHONE_NUMBER': 'Telefonnummer',
      'WEBSITE': 'Website',
      'FONT': 'Schrift',
      'FONT_SIZE': 'Schriftgröße',
      'SAVE_TEMPLATE': 'Template speichern',
      'PUBLISH_TEMPLATE': 'Template veröffentlichen',
      'TEMPLATE_LAYOUT_SAVED': 'Template wurde gespeichert.',
      'TEMPLATE_LAYOUT_ERROR': 'Template konnte nicht gespeichert werden.',
      'TEMPLATE_LAYOUT_PUBLISHED': 'Template wurde veröffentlicht.',
      'TEMPLATE_LAYOUT_PUBLISH_ERROR': 'Template konnte nicht veröffentlicht werden.',
      'ADD_NEW_FRESHCARD_USER': 'Neuen Nutzer zu Freshcard hinzufügen',
      'VIA': 'mit',
      'MENU': 'Menü',
      'SEARCH': 'Suchen',
      'WELCOME': 'Willkommen bei Freshcard!',
      'DELETE_USER': 'Nutzer löschen',
      'CONFIRM_WITH_USERNAME': 'Nutzernamen zur Bestätigung eingeben',
      'USER_ID': 'Nutzer ID',
      'USER_REMOVED': 'Nutzer wurde entfernt.',
      'USER_NOT_REMOVED': 'Nutzer konnte nicht entfernt werden.',
      'NOTES': 'Notizen',
      'SHOW_GRID': 'Gitter anzeigen',
      'SNAP_TO_GRID': 'An Gitter ausrichten',
      'TERMS_OF_SERVICE': 'AGB',
      'PRIVACY': 'Datenschutz',
      'UPLOAD_LOGO': 'Logo hochladen',
      'POSTAL_CODE_ABBR': 'PLZ'
    });
    $translateProvider.preferredLanguage('en_UK');

    $httpProvider.interceptors.push(['$q', '$rootScope', '$location', function ($q, $rootScope, $location) {
      return {
        'responseError': function(rejection) {
          var status = rejection.status;
          var config = rejection.config;
          var method = config.method;
          var url = config.url;
    
          if (status === 401) {
            delete $rootScope.user;
            delete $rootScope.authToken;

            $location.path('/login');
          } else {
            $rootScope.error = method + ' on ' + url + ' failed with status ' + status;
          }
            
          return $q.reject(rejection);
        }
      };
    }]);
    
    $httpProvider.interceptors.push(['$q', '$rootScope', function ($q, $rootScope) {
      var useAuthTokenHeader = true;

      return {
        'request': function(config) {
          var isRestCall = config.url.indexOf('api') > 0;
          if (isRestCall && angular.isDefined($rootScope.authToken)) {
            var authToken = $rootScope.authToken;
            if (useAuthTokenHeader) {
              config.headers['X-Auth-Token'] = authToken;
            } else {
              config.url = config.url + '?token=' + authToken;
            }
          }
          return config || $q.when(config);
        }
      };
    }]);
  })
  .run(function($rootScope, $location, $cookieStore, $localStorage, UserService, LanguageService, ConfigurationService, editableOptions) {
    $rootScope.$on('$viewContentLoaded', function() {
      delete $rootScope.error;
    });
    
    $rootScope.hasRole = function(role) {
      if ($rootScope.user === undefined) {
        return false;
      }
      
      if ($rootScope.user.roles[role] === undefined) {
        return false;
      }
      
      return $rootScope.user.roles[role];
    };
    
    $rootScope.logout = function() {
      delete $rootScope.user;
      delete $rootScope.authToken;

      $cookieStore.remove('authToken');
      $location.path('/login');
    };

    $rootScope.changeOrganization = function(organizationId) {
      $rootScope.user.currentOrganizationId = organizationId;
      UserService.updateCurrentOrganization(
        {
          id: $rootScope.user.id,
          currentOrganization: {
            id: $rootScope.user.currentOrganizationId
          },
          username: $rootScope.user.name
        },
        function(result) {
          $localStorage.currentOrganizationName = $rootScope.currentOrganizationName = result.name;
          $localStorage.currentOrganizationId = $rootScope.user.currentOrganizationId = result.id;
          $localStorage.currentOrganizationTemplate = $rootScope.currentOrganizationTemplate = result.templateImagePath;
          $localStorage.currentOrganizationLogo = $rootScope.currentOrganizationLogo = result.logoImagePath;

          for (var i = 0; i < result.users.length; i++) {
            if (result.users[i].id === $rootScope.user.id) {
              $localStorage.searchPublicKey = $rootScope.user.searchPublicKey = result.users[i].searchPublicKey;
              $localStorage.searchPublicKeyForCoWorkers = $rootScope.user.searchPublicKeyForCoWorkers = result.users[i].searchPublicKeyForCoWorkers;
            }
          }
        }
      );
    };

    $rootScope.changeLanguage = function(key) {
      LanguageService.changeLanguage(key);
      $rootScope.$storage.language = key;
      $rootScope.$storage.languageChangedByUser = true;
    };

    $rootScope.getActiveLinkStartClass = function() {
      if ($location.path() === '/') {
        return 'active';
      } else {
        return '';
      }
    };

    $rootScope.getActiveLinkClass = function(path) {
      if ($location.path().indexOf(path) === 0) {
        return 'active';
      } else {
        return '';
      }
    };

    $rootScope.$storage = $localStorage;
    $rootScope.$storage.languageChangedByUser = false;
    
    var originalPath = $location.path();

    var authToken = $cookieStore.get('authToken');
    if (authToken !== undefined) {
      $rootScope.authToken = authToken;
      $rootScope.user = $rootScope.$storage.user;
      if ($rootScope.$storage.user !== undefined) {
        $rootScope.currentOrganizationName = $rootScope.$storage.currentOrganizationName;
        $rootScope.currentOrganizationTemplate = $rootScope.$storage.currentOrganizationTemplate;
        $rootScope.isBetaTester = $rootScope.$storage.isBetaTester;

        if ($rootScope.$storage.algoliaApplicationID !== undefined) {
          $rootScope.algoliaApplicationID = $rootScope.$storage.algoliaApplicationID;
        } else {
          ConfigurationService.getAlgoliaConfiguration(
            function(algoliaConfiguration) {
              $rootScope.algoliaApplicationID = $rootScope.$storage.algoliaApplicationID = algoliaConfiguration.algoliaApplicationID;
            }
          );
        }

        UserService.get(function(user) {
          $localStorage.user.ownContacts = $rootScope.user.ownContacts = user.ownContacts;
        });
      }

      $.slidebars();

      $location.path(originalPath);
    }

    if (originalPath.indexOf('/public') !== 0) {
      if (authToken !== undefined) {
        $location.path(originalPath);
      } else {
        $location.path('/login');
      }
    }
    
    var language = window.navigator.userLanguage || window.navigator.language;
    if (language.substring(0, 2) === 'de') {
      $rootScope.$storage.language = 'de_DE';
    }
    if (language.substring(0, 2) === 'en') {
      $rootScope.$storage.language = 'en_UK';
    }
    $rootScope.changeLanguage($rootScope.$storage.language);

    editableOptions.theme = 'bs3';

    $rootScope.initialized = true;
  });
