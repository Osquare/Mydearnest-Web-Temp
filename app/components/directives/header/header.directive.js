/**
 * Created by youngmoon on 10/15/15.
 */

module.exports = function (ngModule) {
    ngModule.directive('appHeader', function () {
        require('./header.scss');
        return {
            restrict: 'E',
            template: require('./header.html'),
            link: function (scope, el) {

            }
        };
    });
};