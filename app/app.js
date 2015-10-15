/**
 * Created by youngmoon on 10/14/15.
 */

var angular = require('angular');
var uib = require('angular-ui-router');
var is = require('ng-infinite-scroll');

var ngModule = angular.module('homedecoApp', [
    uib
])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
        ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) => {
            $urlRouterProvider.otherwise('/');
            $locationProvider.html5Mode(true);
            $httpProvider.useApplyAsync(true);

            $stateProvider
                .state('main', {
                    url: '/',
                    resolve: {
                        MAGAZINES: ['CONFIG', '$http', function (CONFIG, $http) {
                            return $http.get(CONFIG.API_URL);
                        }]
                    },
                    template: require('./components/main/main.html'),
                    controller: 'MagazineListController'
                })
                .state('detail', {
                    url: '/view.php',
                    resolve: {
                        MAGAZINE: ['$http', 'CONFIG', 'Methods', function ($http, CONFIG, Methods) {
                            return $http.get(CONFIG.API_URL + '/' + Methods.GetURLParameter('id'));
                        }]
                    },
                    template: require('./components/detail/detail.html'),
                    controller: 'MagazineController'
                });

        }])
    .run(($rootScope, $window, $http, CONFIG, Methods) => {
        // Guest Count
        var referrer = Methods.GetURLParameter('referrer');
        $http.put(CONFIG.PageCount_URL + 'guest?referrer=' +  (referrer || ''));

        /**
         *  $rootScope Window Size Change Event
         */

        angular.element($window).bind('resize', function () {
            $rootScope.$broadcast('$WindowResize')
        });
    });

require('./components')(ngModule);
