/**
 * Created by youngmoon on 10/14/15.
 */

module.exports = function (ngModule) {
    ngModule.directive('banner', function () {
        require('./components/directives/banner/banner.css');
        return {
            restrict: 'E',
            template: require('./components/directives/banner/banner.html'),
            link: function (scope, el, attr) {
                console.log(el);
            }
        };
    });
};