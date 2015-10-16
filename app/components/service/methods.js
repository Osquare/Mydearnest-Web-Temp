/**
 * Created by youngmoon on 10/14/15.
 */

import _ from 'lodash';
import deeplink from 'browser-deeplink';

export default (ngModule) => {

    ngModule.service('Methods', function (CONFIG) {

        var that = this;

        deeplink.setup({
            iOS: {
                appName: 'mydearnest',
                appId: '992731402'
            },
            android: {
                appId: 'com.osqaure.mydearnest'
            }
        });


        /**
         *
         * @returns {string}
         * @desc
         *
         * returning user agent model
         */
        this.getUserAgent = () => {
            return navigator.userAgent.toLocaleLowerCase();
        };

        /**
         *
         * @returns {boolean}r
         * @desc
         *
         * return whether or not the user is using android
         */
        this.isAndroid = () => {
            return that.getUserAgent().search('android') > -1;
        };

        /**
         *
         * @returns {boolean}
         * @desc
         *
         * return whether or not the user is using iphone
         */
        this.isiPhone = () => {
            return that.getUserAgent().search('iphone') > -1;
        };

        /**
         *
         * @param sParam
         * @returns {*}
         * @desc
         *
         * URL 로부터 특정 파라미터의 값을 가져온다.
         */
        this.GetURLParameter = (sParam) => {
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
         * @param text
         * @returns {*}
         * @desc
         *
         * Text 를 HTML 코드로 바꾸어준다.
         */
        this.escapeHTML = (text) => {
            return text && text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace(/\n/gi, '<br>');
        };


        /**
         *
         * @param type
         * @returns {*}
         * @desc
         *
         * type 값에 해당하는 msgType 을 반환한다. type 이 없으면 19 (magazine) 이 Default.
         */
        this.shareType = (type) => {
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
        this.getLink = () => {

            var id = that.GetURLParameter('id'),
                type = that.GetURLParameter('isShare');

            return 'mydearnest://view?msgType='+ that.shareType(type) + (id ? '&id=' + id : '');
        };

        /**
         *  goto Application right away.
         */
        this.gotoApp = () => {
            deeplink.open(that.getLink());
        };

        /**
         *
         * @param imageId
         * @returns {string}
         * @desc
         *
         * imageId 를 받아서 해당 이미지 URL 을 만들어서 return 해준다.
         */
        this.getImage = (imageId) => {
            return CONFIG.IMAGE_URL.replace(/{id}/gi, imageId);
        };

        this.map = _.map;
    });
};