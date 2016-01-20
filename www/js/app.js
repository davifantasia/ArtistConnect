// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        /**
         * Sometimes you wwant the url not to show as a pag at all. So we don't want our tabs that will be at the bottom of the application to be a page itself. We want out tabs to be a sort of component that has the blue bar and icons in it and allows us to navigate to subsections. We dont want a page that has only the tabs navigation, we want a page with that navigation plus something else. That is why we have "abstract: true"
         */
        .state('tabs', {
            url: '/tab', // This would be what users type into brower when they want to navigate to this section.
            abstract: 'true',
            templateUrl: 'templates/tabs.html'
        })
        .state('tabs.home', {
            url: '/home',
            views: {
                'home-tab' : {
                    templateUrl: 'templates/home.html'
                }
            }
        })
        /**
         * Navigating to /list will return as a subtemplate of tabs indicated by tabs.list
         */
        .state('tabs.list', {
            url: '/list',
            /**
             * Views are a way of creating sub-templates. This particular item will have only a single view, and it's called "list-tab"
             * 
             * On the subtemplate load a view called "list-tab".
             */
            views: {
                'list-tab' : {
                    templateUrl: 'templates/list.html',
                    controller: 'ListController',
                    controllerAs: 'list'
                }
            }
        })
        .state('tabs.detail', {
            url: '/list/:aId',
            views: {
                'list-tab' : {
                    templateUrl: 'templates/detail.html',
                    controller: 'ListController',
                    controllerAs: 'list'
                }
            }
        });
        
    $urlRouterProvider.otherwise('/tab/home');
})

.controller('ListController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    var listCtrl = this;
    
    listCtrl.artists = [];
    
    listCtrl.whichArtist = $state.params.aId;
    
    $http.get('js/data.json').success(function(data) {
        // $scope.data is where information abou buttons are stored.
        $scope.data = {showDelete: false, showReorder:false}
        
        listCtrl.artists = data.artists;
        
        listCtrl.doRefresh = function() {
            $http.get('js/data.json').success(function(data) {
                listCtrl.artists = data.artists;
            })
            .finally(function() {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        
        listCtrl.moveArtist = function(artist, fromIndex, toIndex) {
            // Splicing array means cutting an array out of position
            listCtrl.artists.splice(fromIndex, 1);
            listCtrl.artists.splice(toIndex, 0, artist); 
        };
        
        listCtrl.toggleStar = function(artist) {
            artist.star = !artist.star;
        }
        
        listCtrl.onArtistDelete = function(artist) {
            listCtrl.artists.splice(listCtrl.artists.indexOf(artist), 1);
        };
    });
}])