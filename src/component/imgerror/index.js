// 图片错误 显示默认图片
angular.module('jmui.imgerror', [])
    .directive('imgError', function () {
    return {
        scope: {},
        priority: 1000,
        link: function (scope, element, attrs) {
            var defaultImg = attrs.imgError;
            var _ele = angular.element(element);
            var afklLazyImage = attrs.afklLazyImage;

            if (defaultImg) {
                if (afklLazyImage) {
                    attrs.$observe('afklLazyImageLoaded', function (value) {
                        if (value === 'fail') {
                            var img = _ele.find('img');
                            img.attr('src', defaultImg);
                            img.off('error');
                        }
                    });
                } else {
                    if (element[0].tagName.toLowerCase() !== 'img') {
                        _ele = _ele.find('img');

                    }
                    _ele.on('error', function () {
                        _ele.attr('src', defaultImg);
                        _ele.off('error');
                    });
                }
            }
        }
    };
});