/**
 * Created by youngmoon on 12/2/15.
 */

export default (ngModule) => {
    require('./agreement.scss');
    ngModule.controller('AgreementController',
        function ($rootScope, $scope) {
            $rootScope.noBanner = true;
            
            $scope.$on('$destroy', function () {
                $rootScope.noBanner = false;
            });
        });
};