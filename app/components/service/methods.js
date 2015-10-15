/**
 * Created by youngmoon on 10/14/15.
 */
import _ from 'lodash';

export default (ngModule) => {
    ngModule.service('Methods', function (CONFIG) {

        var that = this;

        /**
         *
         * @param sParam
         * @returns {*}
         * @desc
         *
         * URL 로부터 특정 파라미터의 값을 가져온다.
         */
        this.GetURLParameter = function (sParam) {
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
        this.escapeHTML = function(text) {
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
        this.shareType = function (type) {
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
        this.getLink = function () {

            var id = GetURLParameter('id'),
                type = GetURLParameter('isShare');

            return 'mydearnest://view?msgType='+ that.shareType(type) + '&id=' + (id || '');
        };


        this.gotoApp = function () {
            var type = that.GetURLParameter('isShare');

            if (!type) return;

            var link = self.getLink();


        };

        this.getImage = function (imageId) {
            return CONFIG.IMAGE_URL.replace(/{id}/gi, imageId);
        };

        this.map = _.map;
    });
};