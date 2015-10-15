/**
 * Created by youngmoon on 10/14/15.
 */

export default (ngModule) => {
    require('./main.scss');
    ngModule.controller('MagazineListController',
        function ($scope, $timeout, $sce, $http, MAGAZINES, CONFIG, Methods) {
            $scope.scroll_busy = true;
            $scope.last_id = null;
            $scope.magazines = [];

            /**
             *  초기 ui router resolve option 으로 가져온 magazines
             */
            mapping(MAGAZINES.data);

            /**
             *  Window 가 Resizing 될때에 이벤트 발생
             */
            $scope.$on('$WindowResize', adjust);

            $scope.loadMore = function () {
                if ($scope.scroll_busy) return;
                $scope.scroll_busy = true;
                var url = CONFIG.API_URL + '?limit=10';
                if ($scope.last_id) url += '&current=' + $scope.last_id;

                $http.get(url).success(mapping);
            };

            /**
             *  매거진을의 데이터를 가공하기 위해 iterator 를 돌린다.
             */
            function mapping (data) {
                Methods.map(data.data, formatting);
            }

            /**
             *
             * @param data
             * @param idx
             * @param array
             * @desc
             * 앞에서 보여줄 데이터를 가공한 후, $scope.magazines 로 밀어준다.
             */
            function formatting (data, idx, array) {
                data.id = data.mag_id;
                data.img_url = CONFIG.IMAGE_URL.replace(/{id}/gi, data.title_img.img_id);
                data.text = $sce.trustAsHtml(Methods.escapeHTML(data.title));

                if (array.length - 1 === idx) $scope.scroll_busy = false;

                push(data);
            }

            /**
             *
             * @param data
             * @desc
             * data 를 받아서 $scope.magazines 로 push 하며, angular digest 를 돌리면서
             * css 를 잡아준다.
             */
            function push (data) {
                $scope.last_id = data.id;
                $scope.magazines.push(data);
                $timeout(adjust);
            }

            /**
             * @desc
             * Window Size 를 계산하면서 magazine 의 css 를 조정.
             */
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