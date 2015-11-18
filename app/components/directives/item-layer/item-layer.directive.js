/**
 * Created by youngmoon on 11/18/15.
 */

export default (ngModule) => {
    require('./item-layer.scss');
    ngModule.directive('itemLayer', function (ACTIONS) {
        return {
            restrict: 'E',
            template: require('./item-layer.html'),
            link: function (scope) {

                scope.$on(ACTIONS.itemLayerOpen, function (event, item) {
                    $('#ProductPopupTitle').text(item.title);
                    $('#ProductPopupPrice').text(item.price);
                    $('#ProductPopupButton').attr('href', item.link);
                    $('#ProductPopupImage').attr('src', item.image);
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
                });

                scope.close = function () {
                    $('#ProductPopupOverlayWrapper').removeClass('active');
                };
            }
        }
    });
}
