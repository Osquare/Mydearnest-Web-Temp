/**
 * Created by youngmoon on 10/14/15.
 */

export default (ngModule) => {
    ngModule.directive('banner', function ($window, CONFIG, Methods) {
        require('./banner.scss');
        return {
            restrict: 'E',
            template: require('./banner.html'),
            link: function (scope, el) {
                var aTag = el.find('#HeaderAppLink');

                function paint () {
                    aTag.css({
                        width: $window.innerWidth,
                        height: $window.innerWidth / 2 -1
                    });
                    if (Methods.isAndroid()) aTag.attr('href', CONFIG.AndMarket);
                    if (Methods.isiPhone()) aTag.attr('href', CONFIG.iMarket);
                }

                paint();

                scope.$on('$WindowResize', paint);

                scope.$on('$stateChangeStart', function () {
                    scope.noBanner = Methods.GetURLParameter('noBanner');
                });
            }
        };
    });
};