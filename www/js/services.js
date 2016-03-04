(function () {
    var starterServicesApp = angular.module('starter-services', []);
    
    starterServicesApp
    
    .factory('starterServices', ['adsService', function (adsService) {
        var starterServices = {
            initializeAds: function() {
               adsService.initializeAds();
            },
            
            showInterstitialAds: function() {
                adsService.showInterstitialAdIfDeviceIsMobile();
            }
        }
    
        return starterServices;
    }])
    
    .factory('adsService', ['$rootScope', '$log', function ($rootScope, $log) {
        var adsService = {
            admobId: {},
            
            interstitialIsReady: false,
            
            initializeAds: function() {
                // AdMob object works only on mobile devices so ensure device is mobile.
                if (this.isMobileDevice()){
                    $log.log("This is a mobile device.");
                    this.continueWithAdsInitialization();
                } else $log.warn("This is NOT a mobile device - Admob ads will not work.");
            },
            
            isMobileDevice: function() {
                return ionic.Platform.isIPad()
                || ionic.Platform.isIOS()
                || ionic.Platform.isAndroid()
                || ionic.Platform.isWindowsPhone();
            },
            
            continueWithAdsInitialization: function () {
                
                this.getAdmobId();
                this.initializeBannerAd();
                this.initializeInterstitialAd();
                this.initializeAdsEventListeners();
            },
            
            getAdmobId: function () {            
                if (/(android)/i.test(navigator.userAgent)) { // for android & amazon-fireos
                    this.admobid = this.getAndroidAdmobId();
                } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
                    this.admobid = this.getIOSAdmobId();
                } else { // for windows phone
                    this.admobid = this.getWindowsAdmobId();
                }
            },
            
            getAndroidAdmobId: function () {
                return {
                    banner: 'ca-app-pub-3940256099942544/6300978111', // or DFP format "/6253334/dfp_example_ad"
                    interstitial: 'ca-app-pub-3940256099942544/1033173712'
                };
            },
            
            getIOSAdmobId: function () {
                return {
                    banner: 'ca-app-pub-3940256099942544/6300978111', // or DFP format "/6253334/dfp_example_ad"
                    interstitial: 'ca-app-pub-3940256099942544/1033173712'
                };
            },
            
            getWindowsAdmobId: function () {
                return {
                    banner: 'ca-app-pub-3940256099942544/6300978111', // or DFP format "/6253334/dfp_example_ad"
                    interstitial: 'ca-app-pub-3940256099942544/1033173712'
                };
            },
            
            initializeBannerAd: function () {
                this.createAndShowBannerAd();
            },
            
            createAndShowBannerAd: function () {
                var admobid = this.admobid;
                
                if(AdMob) AdMob.createBanner( {
                    adId: admobid.banner, 
                    position: AdMob.AD_POSITION.BOTTOM_CENTER, 
                    autoShow: false } );
            },
            
            initializeInterstitialAd: function () {
                var admobid = this.admobid;
                
                if(AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false} );
            },
            
            initializeAdsEventListeners: function () {
                this.addOnAdLoadedListener();
                this.addOnAdDismissListener();
                this.addOnAdFailLoadListener();
            },
            
            addOnAdLoadedListener: function () {
                var adsServiceThis = this;
                document.addEventListener('onAdLoaded', function(data){
                    adsServiceThis.onAdLoaded(data);
                });
            },
            
            onAdLoaded: function (data) {
                var adsServiceThis = this;
                $rootScope.$apply(function(){
                    adsServiceThis.showBannerOrSetInterstitialIsReadyToTrue(data);
                });
            },
            
            showBannerOrSetInterstitialIsReadyToTrue: function (data) {
                if(data.adType == 'banner') AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
                else if(data.adType == 'interstitial') this.interstitialIsReady = true;
            },
            
            addOnAdDismissListener: function () {
                var adsServiceThis = this;
                document.addEventListener('onAdDismiss',function(data){
                    adsServiceThis.onAdDismiss(data);
                });
            },
            
            onAdDismiss: function (data) {
                if(data.adType == 'interstitial') {
                    this.reinitializeInterstitialAd();
                }
            },
            
            reinitializeInterstitialAd: function () {
                this.interstitialIsReady = false;
                this.initializeInterstitialAd();
            },
            
            addOnAdFailLoadListener: function () {
                var adsServiceThis = this;
                document.addEventListener('onAdFailLoad',function(data){
                    adsServiceThis.onAdFailLoad(data);
                });
            },
            
            onAdFailLoad: function (data) {
                var adsServiceThis = this;
                $rootScope.$apply(function(){
                    adsServiceThis.logError(data);
                    adsServiceThis.hideBannerOrSetInterstitialIsReadyToFalse(data);
                });
            },
            
            logError: function (data) {
                var adTypeError = this.getAdTypError(data);                
                var errorFromAdServer = data.error + ', ' + data.reason;
                var error = adTypeError.concat(": ", errorFromAdServer);
                
                $log.error(error);
            },
            
            getAdTypError: function (data) {
                if(data.adType == 'banner') return "Banner failed to load";
                else if(data.adType == 'interstitial') return "Interstitial failed to load";
            },
            
            hideBannerOrSetInterstitialIsReadyToFalse: function (data) {
                if(data.adType == 'banner') AdMob.hideBanner();
                else if(data.adType == 'interstitial') this.interstitialIsReady = false;
            },
            
            showInterstitialAdIfDeviceIsMobile: function () {
                if (this.isMobileDevice()) this.showInterstitialAdIfItIsReady();
            },
            
            showInterstitialAdIfItIsReady: function () {
                if (this.interstitialIsReady) AdMob.showInterstitial();
            }
            
        }
    
        return adsService;
    }])
    
    ;
})();