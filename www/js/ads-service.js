(function () {
    var app = angular.module('ads-service', []);
    
    app.factory('adsService', ['$rootScope', '$log', function ($rootScope, $log) {
        function AdsService() {
            var admobid = {};
            var interstitialIsReady = false;
            
            this.initializeAds = function () {
                // AdMob object works only on mobile devices so ensure device is mobile.
                if (isMobileDevice()){
                    $log.log("This is a mobile device.");
                    continueWithAdsInitialization();
                } else $log.warn("This is NOT a mobile device - Admob ads will not work.");
            };
            
            var isMobileDevice = function () {
                return ionic.Platform.isIPad()
                || ionic.Platform.isIOS()
                || ionic.Platform.isAndroid()
                || ionic.Platform.isWindowsPhone();
            };
            
            var continueWithAdsInitialization = function () {
                getAdmobId();
                initializeBannerAd();
                initializeInterstitialAd();
                initializeAdsEventListeners();
            };
            
            var getAdmobId = function () {
                if (/(android)/i.test(navigator.userAgent)) { // for android & amazon-fireos
                    admobid = getAndroidAdmobId();
                } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
                    admobid = getIOSAdmobId();
                } else { // for windows phone
                    admobid = getWindowsAdmobId();
                }
            };
            
            var getAndroidAdmobId = function () {
                return {
                    banner: 'ca-app-pub-3940256099942544/6300978111', // or DFP format "/6253334/dfp_example_ad"
                    interstitial: 'ca-app-pub-3940256099942544/1033173712'
                };
            };
            
            var getIOSAdmobId = function () {
                return {
                    banner: 'ca-app-pub-3940256099942544/6300978111', // or DFP format "/6253334/dfp_example_ad"
                    interstitial: 'ca-app-pub-3940256099942544/1033173712'
                };
            };
            
            var getWindowsAdmobId = function () {
                return {
                    banner: 'ca-app-pub-3940256099942544/6300978111', // or DFP format "/6253334/dfp_example_ad"
                    interstitial: 'ca-app-pub-3940256099942544/1033173712'
                };
            };
            
            var initializeBannerAd = function () {
                createAndShowBannerAd();
            };
            
            var createAndShowBannerAd = function () {
                if(AdMob) AdMob.createBanner( {
                    adId: admobid.banner, 
                    position: AdMob.AD_POSITION.BOTTOM_CENTER, 
                    autoShow: false } );
            };
            
            var initializeInterstitialAd = function () {                
                if(AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false} );
            };
            
            var initializeAdsEventListeners = function () {
                addOnAdLoadedListener();
                addOnAdDismissListener();
                addOnAdFailLoadListener();
            };
            
            var addOnAdLoadedListener = function () {
                document.addEventListener('onAdLoaded', function(data){
                    onAdLoaded(data);
                });
            };
            
            var onAdLoaded = function (data) {
                $rootScope.$apply(function(){
                    showBanner(data);
                    setInterstitialIsReadyToTrue(data);
                });
            };
            
            var showBanner = function (data) {
                if(data.adType == 'banner') AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
            };
            
            var setInterstitialIsReadyToTrue = function (data) {
                if(data.adType == 'interstitial') interstitialIsReady = true;
            };
            
            var addOnAdDismissListener = function () {
                document.addEventListener('onAdDismiss',function(data){
                    onAdDismiss(data);
                });
            };
            
            var onAdDismiss = function (data) {
                if(data.adType == 'interstitial') {
                    reinitializeInterstitialAd();
                }
            };
            
            var reinitializeInterstitialAd = function () {
                interstitialIsReady = false;
                initializeInterstitialAd();
            };
            
            var addOnAdFailLoadListener = function () {
                document.addEventListener('onAdFailLoad',function(data){
                    onAdFailLoad(data);
                });
            };
            
            var onAdFailLoad = function (data) {
                $rootScope.$apply(function(){
                    logError(data);
                    hideBannerOrSetInterstitialIsReadyToFalse(data);
                });
            };
            
            var logError = function (data) {
                var adTypeError = getAdTypError(data);                
                var errorFromAdServer = data.error + ', ' + data.reason;
                var error = adTypeError.concat(": ", errorFromAdServer);
                
                $log.error(error);
            };
            
            var getAdTypError = function (data) {
                if(data.adType == 'banner') return "Banner failed to load";
                else if(data.adType == 'interstitial') return "Interstitial failed to load";
            };
            
            var hideBannerOrSetInterstitialIsReadyToFalse = function (data) {
                if(data.adType == 'banner') AdMob.hideBanner();
                else if(data.adType == 'interstitial') interstitialIsReady = false;
            };
            
            this.showInterstitialAd = function () {
                showInterstitialAdIfDeviceIsMobile();
            };
            
            var showInterstitialAdIfDeviceIsMobile = function () {
                if (isMobileDevice()) showInterstitialAdIfItIsReady();
            };
            
            var showInterstitialAdIfItIsReady = function () {
                if (interstitialIsReady) AdMob.showInterstitial();
            };
            
        }
        
        return new AdsService();
    }]);
})();