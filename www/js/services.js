(function () {
    var starterServicesApp = angular.module('starter-services', ['ads-service']);
    
    starterServicesApp.factory('starterServices', ['adsManager', function (adsManager) {
        var starterServices = {
            initializeAds: function() {
               adsManager.initializeAds();
            },
            
            showInterstitialAds: function() {
                adsManager.showInterstitialAdIfDeviceIsMobile();
            }
        }
    
        return starterServices;
    }]);
})();