(function () {
    var starterServicesApp = angular.module('starter-services', ['ads-service']);
    
    starterServicesApp.factory('starterServices', ['adsService', function (adsService) {
        var starterServices = {
            initializeAds: function() {
               adsService.initializeAds();
            },
            
            showInterstitialAds: function() {
                adsService.showInterstitialAdIfDeviceIsMobile();
            }
        }
    
        return starterServices;
    }]);
})();