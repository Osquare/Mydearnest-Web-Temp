/**
 * Created by youngmoon on 10/14/15.
 */

export default (ngModule) => {
    require('./tag.scss');
    ngModule.directive('tag', function (Methods) {
        return {
            restrict: 'E',
            scope: {
                tag: '=tag'
            },
            template: require('./tag.html'),
            link: function (scope, el) {
                if (scope.tag.items.length > 0) {
                    scope.tag.hasItem = true;
                    var item = angular.copy(scope.tag.items[0]);
                    item.title = item.brand.name + ' ' + item.model;
                    item.image = Methods.getImage(item.image.img_id);
                    scope.tag.item = item;
                }

                var PinClick = function () {
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

                    return false;
                };

                el.hover(function () {
                    var width = $(this).find('.pinProductImage').width() + $(this).find('.pinProductContent').width() + 34;
                    $(el).find('.pinProductWrapper').width(width);
                });

                scope.pinClick = PinClick;

                $('.imagePinWrapper').hover(function() {
                    var width = $(this).find('.pinProductImage').width() + $(this).find('.pinProductContent').width() + 34;
                    $(this).find('.pinProductWrapper').width(width);
                });
            }
        }
    });
};