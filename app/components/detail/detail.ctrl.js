/**
 * Created by youngmoon on 10/15/15.
 */

export default (ngModule) => {
    require('./detail.scss');
    ngModule.controller('MagazineController',
        function ($scope, $http, $sce, MAGAZINE, CONFIG, Methods) {
            $http.put(CONFIG.PageCount_URL + 'page');
            $scope.magazine = MAGAZINE.data.data;
            $scope.title = $sce.trustAsHtml(Methods.escapeHTML($scope.magazine.title));
            $scope.pages = $scope.magazine.pages;
            
            console.log($scope.pages);


        });
};