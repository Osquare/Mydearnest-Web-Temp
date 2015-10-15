/**
 * Created by youngmoon on 10/14/15.
 */

export default (ngModule) => {
    ngModule.directive('applink', function () {
        return {
            restrict: 'E',
            template: require('./applink.html'),
            link: function (scope, el, attr) {


                var gotoApp17 = function () {
                    var uagentLow = navigator.userAgent.toLocaleLowerCase(),
                        isiPhone = uagentLow.search('iphone') > -1,
                        isAndroid = uagentLow.search('android') > -1,
                        iMarket = 'itms-apps://itunes.apple.com/kr/app/id992731402?mt=8',
                        AndMarket = 'market://details?id=com.osquare.mydearnest',
                        Link = getLink(),
                        LinkAnd = Link + '#Intent;scheme=mydearnest;package=com.osquare.mydearnest;end',
                        openAt = new Date,
                        iframe = angular.element('#applink'),
                        chrome25 = uagentLow.search('chrome') > -1 &&
                            navigator.appVersion.match(/Chrome\/\d+.\d+/)[0].split('/')[1] > 25;

                    setTimeout(function () {
                        if (new Date - openAt < 4000) {
                            if (isAndroid) {
                                iframe.attr('src', AndMarket);
                            } else if (isiPhone) {
                                location.replace(iMarket);
                            }
                        }
                    }, 3000);

                    if (isAndroid) {
                        iframe.attr('src', LinkAnd);
                    } else if (isiPhone) {
                        console.log(iframe, Link);
                        iframe.attr('src', Link);
                    }
                };
            }
        }
    });
};