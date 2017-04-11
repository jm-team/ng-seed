// 手风琴
angular.module('jmui.accordion', [])
  .directive('jmAccordions', function () {
    return {
      restrict: 'AE',
      scope:{
        visibilityHeight:'@',
        onClick:'&',
        onFinsh:'&',
        target:'@'
      },
      controller: function ($scope, $element, $attrs) {
        
      },
      link: function (scope, ele, attrs) {
          var element = window;
          if(angular.isString(scope.target)){
            element = document.querySelector(scope.target);
          }

          // 计算滚动条当前位置
          function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
              return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
          }

          // 计算需要滚动目标点的位置
          function elmYPosition(eID) {
            var elm = document.body;
            if (angular.isString(eID)) {
              elm = document.getElementById(eID);
            }
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
              node = node.offsetParent;
              y += node.offsetTop;
            }
            return y;
          }

          ele.on('scroll', function(){

          });
      }
    }
  });