/**
 * Created by user on 9/6/15.
 */

import template from './app.html';
import './app.css';

let appComponent = () => {
  return {
    template,
    restrict: 'E'
  };
};

export default appComponent;