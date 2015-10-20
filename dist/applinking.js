/**
 * Created by youngmoon on 10/21/15.
 */
(function () {
    var timeout;
    var settings = {
        "iOS": {
            appName: 'mydearnest',
            appId: '992731402'
        },

        "android": {
            appId: 'com.osquare.mydearnest'
        },
        "fallback": true,
        "delay": 1000,
        "delta": 500
    };

    /**
     *
     * @param sParam
     * @returns {*}
     * @desc
     *
     * URL 로부터 특정 파라미터의 값을 가져온다.
     */
    var GetURLParameter = function (sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    };

    /**
     *
     * @param type
     * @returns {*}
     * @desc
     *
     * type 값에 해당하는 msgType 을 반환한다. type 이 없으면 19 (magazine) 이 Default.
     */
    var shareType = function (type) {
        if (!type) return 19;

        var types = {
            magazine: 19,
            feed_self: 5,
            feed_qa: 24,
            furniture: 16,
            interior: 18,
            announce: 8
        };

        return types[type] || 19;
    };


    /**
     *
     * @returns {string}
     * @desc
     *
     * id 와 type 으로 알맞는 AppLink 를 반환
     */
    var getLink = function () {
        var id = GetURLParameter('id'),
            type = GetURLParameter('isShare'),
            Link = 'mydearnest://view?msgType='+ shareType(type) + (id ? '&id=' + id : '');
        return Link;
    };

    /**
     * Generate the app store link for iOS / Apple app store
     *
     * @private
     * @returns {String} App store itms-apps:// link
     */
    var getStoreURLiOS = function() {
        var baseurl = "itms-apps://itunes.apple.com/app/";
        var name = settings.iOS.appName;
        var id = settings.iOS.appId;
        return (id && name) ? (baseurl + name + "/id" + id + "?mt=8") : null;
    };

    /**
     * Generate the app store link for Google Play
     *
     * @private
     * @returns {String} Play store https:// link
     */
    var getStoreURLAndroid = function() {
        var baseurl = "market://details?id=";
        var id = settings.android.appId;
        return id ? (baseurl + id) : null;
    };

    /**
     * Get app store link, depending on the current platform
     *
     * @private
     * @returns {String} url
     */
    var getStoreLink = function() {
        var linkmap = {
            "ios": getStoreURLiOS(),
            "android": getStoreURLAndroid()
        };

        return linkmap[settings.platform];
    };

    /**
     * Check if the user-agent is Android
     *
     * @private
     * @returns {Boolean} true/false
     */
    var isAndroid = function() {
        return navigator.userAgent.match('Android');
    };

    /**
     * Check if the user-agent is iPad/iPhone/iPod
     *
     * @private
     * @returns {Boolean} true/false
     */
    var isIOS = function() {
        return navigator.userAgent.match('iPad') ||
            navigator.userAgent.match('iPhone') ||
            navigator.userAgent.match('iPod');
    };

    /**
     * Check if the user is on mobile
     *
     * @private
     * @returns {Boolean} true/false
     */
    var isMobile = function() {
        return isAndroid() || isIOS();
    };

    /**
     * Each store links get from getStoreLink() function,
     *
     *
     * @private
     * @param {Integer} Timestamp when trying to open applink
     * @returns {Function} Function to be executed by setTimeout
     */
    var openAppStore = function(ts) {
        return function() {
            var link = getStoreLink();
            var wait = settings.delay + settings.delta;
            if (typeof link === "string" && (Date.now() - ts) < wait) {
                window.location.href = link;
            }
        };
    };

    /**
     * Tries to open app URI through a hidden iframe.
     *
     * @public
     * @param {String} APPlink URI
     */
    var open = function(uri) {
        var has_safari = navigator.userAgent.indexOf('Safari/')  > -1;
        var is_ios9    = navigator.userAgent.indexOf('iPhone OS 9_')  > -1;

        if (isAndroid()) settings.platform = "android";
        if (isIOS()) settings.platform = "ios";

        if (!isMobile()) {
            return;
        }

        if (isAndroid() && !navigator.userAgent.match(/Firefox/)) {
            var matches = uri.match(/([^:]+):\/\/(.+)$/i);
            uri = "intent://" + matches[2] + "#Intent;scheme=" + matches[1];
            uri += ";package=" + settings.android.appId + ";end";
        }

        if (settings.fallback) {
            timeout = $timeout(function () {openAppStore(Date.now())}, settings.delay);
        }

        if (has_safari || !is_ios9) {
            var iframe = document.createElement("iframe");
            iframe.onload = function() {
                $timeout.clear(timeout);
                iframe.parentNode.removeChild(iframe);
                window.location.href = uri;
            };

            iframe.src = uri;
            iframe.setAttribute("style", "display:none;");
            document.body.appendChild(iframe);
        } else {
            window.location.assign(uri);
        }
    };

    open(getLink());
})();