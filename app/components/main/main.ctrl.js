/**
 * Created by youngmoon on 10/14/15.
 */

module.exports = function (ngModule) {
    ngModule.controller('MagazineListController',
        function ($scope, $timeout, $sce, $http, MAGAZINES, CONFIG, Methods) {
        require('./main.scss');

        var magazines = MAGAZINES.data.data;
        $scope.scroll_busy = true;
        $scope.last_id = null;
        $scope.magazines = [];

        /**
         *
         *  Window 가 Resizing 될때에 이벤트 발생
         */
        $scope.$on('$WindowResize', adjust);
        Methods.map(magazines, (formatting));

        function formatting (data, idx, array) {
            data.id = data.mag_id;
            data.img_url = CONFIG.IMAGE_URL.replace(/{id}/gi, data.title_img.img_id);
            data.text = $sce.trustAsHtml(Methods.escapeHTML(data.title));

            if (array.length - 1 === idx) $scope.scroll_busy = false;

            push(data);
        }

        function push (data) {
            $scope.last_id = data.id;
            $scope.magazines.push(data);
            $timeout(adjust);
        }

        function adjust () {
            var width = Math.floor($(window).width() / 2)-1;
            if ($(window).width() < 1024) {
                $('.magazineItem').width(width);
            } else {
                $('.magazineItem').width(width);
            }
            $('.magazineItem').height(width);
        }
    });
};