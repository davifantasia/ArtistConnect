(function () {
    // Ionic Starter App
    // angular.module is a global place for creating, registering and retrieving Angular modules
    // 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
    // the 2nd parameter is an array of 'requires'
    angular.module('starter', ['ionic', 'starter-controllers', 'starter-services'])
    .run(function ($ionicPlatform, adsManager) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
            
            adsManager.initializeAds();
        });
    }).config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('tabs', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        }).state('tabs.home', {
            url: '/home',
            views: {
                'home-tab': {
                    templateUrl: 'templates/home.html'
                }
            }
        }).state('tabs.list', {
            url: '/list',
            views: {
                'list-tab': {
                    templateUrl: 'templates/list.html',
                    controller: 'ListController'
                }
            }
        }).state('tabs.detail', {
            url: '/list/:aId',
            views: {
                'list-tab': {
                    templateUrl: 'templates/detail.html',
                    controller: 'ListController'
                }
            }
        }).state('tabs.calendar', {
            url: '/calendar',
            views: {
                'calendar-tab': {
                    templateUrl: 'templates/calendar.html',
                    controller: 'CalendarController'
                }
            }
        });

        $urlRouterProvider.otherwise('/tab/home');
    });
    
    // var adsManager = {
    //     admobId: {},
        
    //     initializeAds: function() {
    //         // Ads works only on mobile devices so ensure it is.
    //         if (this.isMobileDevice()) this.continueWithAdsInitialization();
    //     },
        
    //     isMobileDevice: function() {
    //         return ionic.Platform.isIPad()
    //         || ionic.Platform.isIOS()
    //         || ionic.Platform.isAndroid()
    //         || ionic.Platform.isWindowsPhone();
    //     },
        
    //     continueWithAdsInitialization: function () {
    //         console.log("It is Mobile");
            
    //         this.getAdmobId();
    //         this.initializeBannerAd();
    //         this.initializeInterstitialAd();
    //     },
        
    //     getAdmobId: function () {            
    //         if (/(android)/i.test(navigator.userAgent)) { // for android & amazon-fireos
    //             this.admobid = this.getAndroidAdmobId();
    //         } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
    //             this.admobid = this.getIOSAdmobId();
    //         } else { // for windows phone
    //             this.admobid = this.getWindowsAdmobId();
    //         }
    //     },
        
    //     getAndroidAdmobId: function () {
    //         return {
    //             banner: 'ca-app-pub-3940256099942544/6300978111', // or DFP format "/6253334/dfp_example_ad"
    //             interstitial: 'ca-app-pub-3940256099942544/1033173712'
    //         };
    //     },
        
    //     getIOSAdmobId: function () {
    //         return {
    //             banner: 'ca-app-pub-3940256099942544/6300978111', // or DFP format "/6253334/dfp_example_ad"
    //             interstitial: 'ca-app-pub-3940256099942544/1033173712'
    //         };
    //     },
        
    //     getWindowsAdmobId: function () {
    //         return {
    //             banner: 'ca-app-pub-3940256099942544/6300978111', // or DFP format "/6253334/dfp_example_ad"
    //             interstitial: 'ca-app-pub-3940256099942544/1033173712'
    //         };
    //     },
        
    //     initializeBannerAd: function () {
    //         this.createAndShowBannerAd();
    //     },
        
    //     createAndShowBannerAd: function () {
    //         var admobid = this.admobid;
            
    //         // it will display smart banner at bottom center, using the default options
    //         if(AdMob) AdMob.createBanner( {
    //             adId: admobid.banner, 
    //             position: AdMob.AD_POSITION.BOTTOM_CENTER, 
    //             autoShow: true } );
    //     },
        
    //     initializeInterstitialAd: function () {
    //         var admobid = this.admobid;
            
    //         if(AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false} );
    //     },
        
    //     showInterstitialAd: function () {
    //         if(AdMob) {
    //             AdMob.isInterstitialReady(function(isready){
    //                 if(isready) AdMob.showInterstitial();
    //             });
    //         }
    //     }
        
    // }
})();
