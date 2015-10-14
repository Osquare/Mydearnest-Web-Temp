/**
 * Created by youngmoon on 10/14/15.
 */

module.exports = function (ngModule) {
    ngModule.directive('banner', function ($window, $document, Methods) {
        require('./banner.scss');
        return {
            restrict: 'E',
            template: require('./banner.html'),
            link: function (scope, el, attr) {
                var aTag = $('a#HeaderAppLink');

                function paint () {
                    aTag.css({
                        width: $window.innerWidth,
                        height: $window.innerWidth / 2 -1
                    });
                }

                paint();

                scope.$on('$WindowResize', paint);
            }
        };
    });
};