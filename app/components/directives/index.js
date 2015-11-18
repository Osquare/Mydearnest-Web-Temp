/**
 * Created by youngmoon on 10/14/15.
 */

export default (ngModule) => {
    require('./banner/banner.directive')(ngModule);
    require('./header/header.directive')(ngModule);
    require('./item-layer/item-layer.directive')(ngModule);
    require('./scroll/scroll.directive')(ngModule);
    require('./tag/tag.directive')(ngModule);
};