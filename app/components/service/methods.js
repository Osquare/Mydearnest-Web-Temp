/**
 * Created by youngmoon on 10/14/15.
 */

module.exports = function (ngModule) {
    ngModule.service('Methods', function () {

        var that = this;

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

        this.escapeHTML = function(text) {
            return text && text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace(/\n/gi, '<br>');
        };

        this.ResizeWindow = function() {
            var width = Math.floor($(window).width()/2)-1;
            if ($(window).width() < 1024) {
                $('.magazineItem:nth-child(1)').width($(window).width());
                $('.magazineItem').slice(1).width(width);
            } else {
                $('.magazineItem:nth-child(2)').width($(window).width());
                $('.magazineItem').slice(2).width(width);
            }
            $('.magazineItem').height(width);
        };


    });
};