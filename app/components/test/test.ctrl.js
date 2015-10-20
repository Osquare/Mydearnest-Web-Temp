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


            $scope.iosLocationHref = function () {
                window.location.href = "mydearnest://view?msgType=19&id=318002";
            };

            $scope.androidLocationHref = function () {
                window.location.href = "intent://view?msgType=19&id=318002#Intent;scheme=mydearnest;package=com.osquare.mydearnest;end";
            };

            $scope.iosLocationAssign = function () {
                window.location.assign("mydearnest://view?msgType=19&id=318002");
            };

            $scope.androidLocationAssign = function () {
                window.location.assign("intent://view?msgType=19&id=318002#Intent;scheme=mydearnest;package=com.osquare.mydearnest;end");
            };

        });
};