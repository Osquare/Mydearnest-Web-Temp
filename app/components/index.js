/**
 * Created by youngmoon on 10/14/15.
 */


export default (ngModule) => {
    require('./config/actions')(ngModule);
    require('./config/config.constant')(ngModule);
    require('./detail/detail.ctrl')(ngModule);
    require('./directives')(ngModule);
    require('./main/main.ctrl')(ngModule);
    require('./service/methods')(ngModule);
    require('./service/applink')(ngModule);
};