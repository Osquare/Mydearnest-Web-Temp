/**
 * Created by user on 9/6/15.
 */

import template from './navbar.html';
import controller from './navbar.controller.js';
import './navbar.css';

let navbarComponent = function () {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default navbarComponent;
