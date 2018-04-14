// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'firebase'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.stories', {
        url: '/stories',
        views: {
          'menuContent': {
            templateUrl: 'js/stories/stories.html',
            controller: 'StoriesCtrl',
            controllerAs: 'vm'
          }
        }
      })

      .state('app.story', {
        url: '/stories/:storyTitle',
        views: {
          'menuContent': {
            templateUrl: 'js/stories/story.html',
            controller: 'StoryCtrl',
            controllerAs: 'vm'
          }
        }
      })

      .state('app.phrasebook', {
        url: '/phrasebook',
        views: {
          'menuContent': {
            templateUrl: 'js/phrasebook/phrasebook.html',
            controller: 'PhrasebookCtrl',
            controllerAs: 'vm'
          }
        }
      })

      .state('app.phrase', {
        url: '/phrasebook/:phraseSh',
        views: {
          'menuContent': {
            templateUrl: 'js/phrasebook/phrase.html',
            controller: 'PhraseCtrl',
            controllerAs: 'vm'
          }
        }
      })

      .state('app.dictionary', {
        url: '/dictionary',
        views: {
          'menuContent': {
            templateUrl: 'js/dictionary/dictionary.html',
            controller: 'DictionaryCtrl',
            controllerAs: 'vm'
          }
        }
      })

      .state('app.word', {
        url: '/dictionary/:wordSh',
        views: {
          'menuContent': {
            templateUrl: 'js/dictionary/word.html',
            controller: 'WordCtrl',
            controllerAs: 'vm'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/dictionary');
  });

angular.module('starter.services', [])
angular.module('starter.controllers', [])