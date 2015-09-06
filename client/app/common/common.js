/**
 * Created by user on 9/6/15.
 */

import angular from 'angular';
import Navbar from './navbar/navbar';

let commonModule = angular.module('app.common', [
  Navbar.name
]);

export default commonModule;
