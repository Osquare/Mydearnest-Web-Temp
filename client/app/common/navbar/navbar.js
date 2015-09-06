/**
 * Created by user on 9/6/15.
 */

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import navbarComponent from './navbar.component';

let navbarModule = angular.module('navbar', [
  uiRouter
])
.directive('navbar', navbarComponent);

export default navbarModule;