/**
 * Created by youngmoon on 10/20/15.
 */

export default (ngModule) => {
    ngModule.controller('TESTController',
        function ($scope, Methods) {

            $scope.iosLocation = function () {
                window.location = "mydearnest://view?msgType=19&id=318002";
            };

            $scope.androidLocation = function () {
                window.location = "intent://view?msgType=19&id=318002#Intent;scheme=mydearnest;package=com.osquare.mydearnest;end";
            };

        });
};