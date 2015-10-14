/**
 * Created by youngmoon on 10/14/15.
 */

module.exports = function (ngModule) {
    require('./applink/applink.directive')(ngModule);
    require('./banner/banner.directive')(ngModule);
    require('./tag/tag.directive')(ngModule);
};