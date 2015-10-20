/**
 * Created by youngmoon on 10/14/15.
 */

export default (ngModule) => {
    ngModule.directive('applink', function (CONFIG, Methods) {
        return {
            restrict: 'E',
            template: require('./applink.html'),
            link: function (scope, el) {
                if (Methods.GetURLParameter('isShare')) Methods.gotoApp();

                function gotoApp () {
                    var Link = Methods.getLink(),
                        LinkAnd = Link + '#Intent;scheme=mydearnest;package=com.osquare.mydearnest;end',
                        openAt = new Date,
                        iframe = el.find('iframe'),
                        chrome25 = uagentLow.search('chrome') > -1 &&
                            navigator.appVersion.match(/Chrome\/\d+.\d+/)[0].split('/')[1] > 25;

                    setTimeout(function () {
                        if (new Date - openAt < 4000) {
                            if (Methods.isAndroid()) {
                                if (chrome25) iframe.attr('src', CONFIG.AndMarket);
                                else iframe.attr('src', CONFIG.AndMarket);
                            } else if (Methods.isiPhone()) {
                                location.replace(CONFIG.iMarket);
                            }
                        }
                    }, 3000);


                    if (Methods.isAndroid()) {
                        iframe.attr('src', LinkAnd);
                    } else if (Methods.isiPhone()) {
                        iframe.attr('src', Link);
                    }
                }
            }
        };
    });
};