/**
 * Created by youngmoon on 10/14/15.
 */

export default ngModule => {
    ngModule.directive('banner', () => {
        require('./banner.css');
        return {
            restrict: 'E',
            template: require('./banner.html'),
            link: function (scope, el, attr) {
                console.log(el);
            }
        };
    });
};