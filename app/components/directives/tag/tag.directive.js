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

                scope.pinClick = () => {
                    Methods.itemLayerOpen(item);
                };

                el.hover(function () {
                    var width = $(this).find('.pinProductImage').width() + $(this).find('.pinProductContent').width() + 34;
                    $(el).find('.pinProductWrapper').width(width);
                });
            }
        }
    });
};