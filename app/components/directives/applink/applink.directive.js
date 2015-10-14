/**
 * Created by youngmoon on 10/14/15.
 */

module.exports = function (ngModule) {
    ngModule.directive('applink', function () {
        return {
            restrict: 'E',
            template: require('./applink.html'),
            link: function (scope, el, attr) {
                console.log('app link');
            }
        }
    });
};