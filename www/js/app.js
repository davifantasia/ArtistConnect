// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter-controllers'])
.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
            
        initializeAds();
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

function initializeAds() {
    if (isMobileDevice()) continueWithAdsInitialization();
}

function isMobileDevice() {
    return ionic.Platform.isIPad()
    || ionic.Platform.isIOS()
    || ionic.Platform.isAndroid()
    || ionic.Platform.isWindowsPhone();
}

function continueWithAdsInitialization() {
    // Device is mobile
    console.log("It is Mobile");
    
    var admobid = getAdmobId();
    
    // Add admob banner ads
    createBannerAd(admobid);
    
    // Add admob interstitial ads
    // prepare and load ad resource in background
    // if(AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false} );

    // show the interstitial later, e.g. at end of game level
    // if(AdMob) AdMob.showInterstitial();
    // END: Add admob interstitial ads
}

function getAdmobId() {
    // Add admob banner ads
    var admobid = {};
    
    if (/(android)/i.test(navigator.userAgent)) { // for android & amazon-fireos
        admobid = getAndroidAdmobId();
    } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
        admobid = getIOSAdmobId();
    } else { // for windows phone
        admobid = getWindowsAdmobId();
    }
    
    return admobid;
}

function getAndroidAdmobId(){
    return {
            banner: 'ca-app-pub-3940256099942544/6300978111', // or DFP format "/6253334/dfp_example_ad"
            interstitial: 'ca-app-pub-3940256099942544/1033173712'
        };
}

function getIOSAdmobId() {
    return {
            banner: 'ca-app-pub-3940256099942544/6300978111', // or DFP format "/6253334/dfp_example_ad"
            interstitial: 'ca-app-pub-3940256099942544/1033173712'
        };
}

function getWindowsAdmobId() {
    return {
            banner: 'ca-app-pub-3940256099942544/6300978111', // or DFP format "/6253334/dfp_example_ad"
            interstitial: 'ca-app-pub-3940256099942544/1033173712'
        };
}

function createBannerAd(admobid) {
    // it will display smart banner at bottom center, using the default options
    if(AdMob) AdMob.createBanner( {
        adId: admobid.banner, 
        position: AdMob.AD_POSITION.BOTTOM_CENTER, 
        autoShow: true } );
}