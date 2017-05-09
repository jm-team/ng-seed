/*global require, angular*/
(function () {
  "use strict";

  /**
 * [imgerror 图片加载出错]
 *
 * @description
 * imgerror 图片加载出错
 *
 * @example
 * <img ng-src="{{ vm.jpg }}" img-error="../../../asset/img/logo.png" alt="图片加载失败显示默认图">
 *
 */
  angular.module('jmui.imgerror', [])
    .directive('imgError', function () {
      return {
        scope: {},
        priority: 1000,
        link: function (scope, element, attrs) {
          var defaultImg = attrs.imgError;
          var ele = angular.element(element);
          var afklLazyImage = attrs.afklLazyImage;

          if (defaultImg) {
            if (afklLazyImage) {
              attrs.$observe('afklLazyImageLoaded', function (value) {
                if (value === 'fail') {
                  var img = ele.find('img');
                  img.attr('src', defaultImg);
                  img.off('error');
                }
              });
            } else {
              if (element[0].tagName.toLowerCase() !== 'img') {
                ele = ele.find('img');

              }
              ele.on('error', function () {
                ele.attr('src', defaultImg);
                ele.off('error');
              });
            }
          }
        }
      };
    });
}());
