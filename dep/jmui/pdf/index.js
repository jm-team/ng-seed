/*global require, angular, console, PDFObject*/
/**
 * [pdf pdf预览组件]
 *
 * @author zhoul
 * @description
 *  组件基于pdfobject.js 
 *  https://github.com/pipwerks/PDFObject
 * 
 * pdf预览组件：
 *  指令属性详细：
 *      1) url: pdf 地址
 *
 * @example
 *  <div jm-pdf url="./dist/img/system/1.pdf"></div>
 *
 */

require('expose-loader?PDFObject!./pdfobject.js');
angular.module("jmui.pdf", [])
  .directive('jmPdf', function () {
    // 判断是否是IE
    // IE 在没有安装PDF 阅读软件或者浏览器调用不出pdf阅读软件的时候
    // 应该显示pdf 文件地址链接
    function isIE() {
      if (!!window.ActiveXObject || "ActiveXObject" in window) {
        return true;
      } else {
        return false;
      }
    }

    return {
      restrict: 'AE',
      scope: {},
      link: function (scope, element, attrs) {
        var iframe = null;

        attrs.$observe('url', function (newValue) {
          if (PDFObject.supportsPDFs) {
            PDFObject.embed(newValue, element[0], {
              fallbackLink: "<p class='noSupport'>您的浏览器不支持在线预览PDF， 您可以 <a target='_blank' href='" + newValue + "'>下载这个PDF</a></p>"
            });
          } else if (isIE()) {
            PDFObject.embed(newValue, element[0], {
              fallbackLink: "<p class='noSupport'>您的浏览器不支持在线预览PDF， 您可以 <a target='_blank' href='" + newValue + "'>下载这个PDF</a></p>"
            })
          } else {
            // firefox
            if (!iframe) {
              iframe = document.createElement('iframe');
            }
            iframe.src = newValue;
            iframe.width = '100%';
            iframe.style.height = '100%';
            iframe.border = '0';
            iframe.frameBorder = "no";
            element.append(iframe);
          }
        });

        scope.$on('$destory', function () {
          var ifra = angular.element(iframe);
          if (angular.isObject(ifra) && angular.isFunction(ifra.remove)) {
            ifra.remove();
            ifra = null;
          }
        });
      }
    };
  });
