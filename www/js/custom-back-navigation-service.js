(function () {
    var app = angular.module('custom-back-navigation-service', []);
    
    app.factory('customBackNavigationService', [
        '$rootScope', '$ionicPlatform', '$ionicHistory', 'adsService', 
        function ($rootScope, $ionicPlatform, $ionicHistory, adsService) {
        function CustomBackNavigationService() {
            var scope;
            var oldSoftNavigateBack;
            var deregisterHardBackButton;
            
            this.initializeCustomBackNavigation = function($scope) {
                scope = $scope;
                
                // Save reference to framework soft back navigation.
                oldSoftNavigateBack = $rootScope.$ionicGoBack;
                
                $rootScope.$ionicGoBack = doCustomBackNavigation;
                
                setDeregisterHardBackButton();   
                
                addOnScopeDestroyListener();
            };
            
            var setDeregisterHardBackButton = function() {
                deregisterHardBackButton = $ionicPlatform.registerBackButtonAction(
                    doCustomBackNavigation, 101
                );
            };
            
            var doCustomBackNavigation = function () {
                adsService.showInterstitialAd();
                $ionicHistory.goBack();
            };
            
            var addOnScopeDestroyListener = function() {
                // cancel custom back behaviour
                scope.$on('$destroy', function () {
                    deregisterSoftBackButton();
                    deregisterHardBackButton();
                });
            };
            
            var deregisterSoftBackButton = function () {
                $rootScope.$ionicGoBack = oldSoftNavigateBack;
            };
        }
        
        return new CustomBackNavigationService();
    }]);
})();