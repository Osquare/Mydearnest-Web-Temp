/**
 * Created by youngmoon on 10/15/15.
 */

export default (ngModule) => {
    require('./detail.scss');
    ngModule.controller('MagazineController',
        function ($scope, $location, $http, $sce, MAGAZINE, CONFIG, Methods) {
            $http.put(CONFIG.PageCount_URL + 'page');

            if (!MAGAZINE.data.data) {
                $location.search({});
                return $location.path('/');
            }

            $scope.magazine = MAGAZINE.data.data;
            $scope.title = $sce.trustAsHtml(Methods.escapeHTML($scope.magazine.title));
            $scope.pages = [];

            Methods.map($scope.magazine.pages,(data) => {
                data.text = $sce.trustAsHtml(Methods.escapeHTML(data.text));
                $scope.pages.push(data);
            });
        });
};