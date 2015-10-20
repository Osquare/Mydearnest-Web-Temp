/**
 * Created by youngmoon on 10/20/15.
 */

export default (ngModule) => {
    ngModule.controller('TESTController',
        function ($scope, Methods) {
            location.href = 'http://deeplink.me/ggumim.co.kr';
        });
};