/**
 * Created by youngmoon on 10/14/15.
 */

module.exports = function (ngModule) {
    ngModule.constant('CONFIG', {
        API_URL: 'http://api.ggumim.co.kr/1.7/magazines',
        IMAGE_URL:  'http://image.ggumim.co.kr/unsafe/{id}/{id}',
        PageCount_URL:  'http://api.ggumim.co.kr/api/count/',
        iMarket: 'itms-apps://itunes.apple.com/kr/app/id992731402?mt=8',
        AndMarket: 'market://details?id=com.osquare.mydearnest'
    });
};