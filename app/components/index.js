/**
 * Created by youngmoon on 10/14/15.
 */


module.exports = function (ngModule) {
    require('./directives')(ngModule);
    require('./config/config.constant')(ngModule);
    require('./main/main.ctrl')(ngModule);
    require('./service/methods')(ngModule);
};