/**
 * Created by youngmoon on 10/14/15.
 */

import angular from 'angular';
import uib from 'angular-ui-router';

const ngModule = angular.module('homedecoApp', [
    uib
])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
            $urlRouterProvider.otherwise('/');
            $locationProvider.html5Mode(true);
            $httpProvider.useApplyAsync(true);
        }])
    .run(() => {
        console.log('hello');
    });

require('./components')(ngModule);
