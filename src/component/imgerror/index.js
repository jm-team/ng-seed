/*global require, angular*/
(function () {
  "use strict";

  // 图片错误 显示默认图片
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
