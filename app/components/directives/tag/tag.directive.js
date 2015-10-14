/**
 * Created by youngmoon on 10/14/15.
 */

module.exports = function (ngModule) {
    ngModule.directive('tag', function () {
        return {
            restrict: 'E',
            template: require('./tag.html'),
            link: function (scope, el, attr) {
                console.log(el);
                var PinClick = function() {
                    var title = $(this).parent().find('.pinProductTitle').text();
                    var price = $(this).parent().find('.pinProductPrice').text();
                    var link = $(this).parent().find('.pinProductButton').attr('href');
                    var image = $(this).parent().find('.pinProductImage').attr('src');

                    $('#ProductPopupTitle').text(title);
                    $('#ProductPopupPrice').text(price);
                    $('#ProductPopupButton').attr('href', link);
                    $('#ProductPopupImage').attr('src', image);
                    $('#ProductPopup').width('initial');

                    $('#ProductPopup').imagesLoaded(function() {
                        $('#ProductPopupOverlayWrapper').addClass('active');
                        var position = $('#ProductPopupOverlayWrapper').height() - $('#ProductPopup').height();
                        if (position < 100) {
                            var ratio = $('#ProductPopup').height() / $('#ProductPopup').width();
                            var width = ($('#ProductPopupOverlayWrapper').height() - 60) / ratio;
                            $('#ProductPopup').width(width + 'px');
                            position = $('#ProductPopupOverlayWrapper').height() - $('#ProductPopup').height();
                        }
                        $('#ProductPopupWrapper').css('top', (position/2) + 'px');
                    });

                    return false;
                };
            }
        }
    });
};