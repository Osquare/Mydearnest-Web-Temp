/**
 * Created by youngmoon on 12/2/15.
 */

export default (ngModule) => {
    require('./agreement.scss');
    ngModule.controller('AgreementController',
        function ($rootScope, $scope) {
            $rootScope.noBanner = true;
            
            console.log('$$$$');

            $scope.$on('$destroy', function () {
                $rootScope.noBanner = false;
            });
        });
};