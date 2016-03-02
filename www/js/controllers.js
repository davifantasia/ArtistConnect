(function () {
    var starterControllersApp = angular.module('starter-controllers', []);

    starterControllersApp.controller('ListController', [
        '$scope', '$http', '$state', 'adsManager',
        function ($scope, $http, $state, adsManager) {
            $http.get('js/data.json').success(function (data) {
                $scope.artists = data.artists;
                
                $scope.whichartist = $state.params.aId;
                if ($scope.whichartist) adsManager.showInterstitialAdIfDeviceIsMobile();
                
                $scope.data = { showDelete: false, showReorder: false };

                $scope.onItemDelete = function (item) {
                    $scope.artists.splice($scope.artists.indexOf(item), 1);
                };

                $scope.doRefresh = function () {
                    $http.get('js/data.json').success(function (data) {
                        $scope.artists = data.artists;
                        $scope.$broadcast('scroll.refreshComplete');
                    });
                };

                $scope.toggleStar = function (item) {
                    item.star = !item.star;
                };

                $scope.moveItem = function (item, fromIndex, toIndex) {
                    $scope.artists.splice(fromIndex, 1);
                    $scope.artists.splice(toIndex, 0, item);
                };
            });
        }]);

    starterControllersApp.controller('CalendarController', [
        '$scope', '$http', '$state',
        function ($scope, $http, $state) {
            $http.get('js/data.json').success(function (data) {
                $scope.calendar = data.calendar;

                $scope.onItemDelete = function (dayIndex, item) {
                    $scope.calendar[dayIndex].schedule.splice($scope.calendar[dayIndex].schedule.indexOf(item), 1);
                };

                $scope.doRefresh = function () {
                    $http.get('js/data.json').success(function (data) {
                        $scope.calendar = data.calendar;
                        $scope.$broadcast('scroll.refreshComplete');
                    });
                };

                $scope.toggleStar = function (item) {
                    item.star = !item.star;
                };
            });
        }]);
})();
