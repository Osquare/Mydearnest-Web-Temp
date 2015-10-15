/**
 * Created by youngmoon on 10/15/15.
 */

export default (ngModule) => {
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