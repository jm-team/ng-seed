var app = require('app');

app.provider('anchorSmoothScroll', function () {

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

  return {
    $get: function ($q) {
      return {
        /**
         * 滚动方法
         * @author zhoul
         * @param   {eID}     string   可选 目标点的ID名
         */
        scrollTo: function (eID) {
          var defer = $q.defer();

          // scroll参考 
          // http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

          var startY = currentYPosition();
          var stopY = elmYPosition(eID);
          var distance = stopY > startY ? stopY - startY : startY - stopY;
          if (distance < 100) {
            scrollTo(0, stopY);
            return;
          }
          var speed = Math.round(distance / 100);
          if (speed >= 20) speed = 20;
          var step = Math.round(distance / 25);
          var leapY = stopY > startY ? startY + step : startY - step;
          var timer = 0;
          if (stopY > startY) {
            for (var i = startY; i < stopY; i += step) {
              setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
              leapY += step;
              if (leapY > stopY) leapY = stopY;
              timer++;
            }
          }else{
            for (var i = startY; i > stopY; i -= step) {
              setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
              leapY -= step;
              if (leapY < stopY) leapY = stopY;
              timer++;
            }
          }

          setTimeout(defer.resolve, timer*speed);
          
          return defer.promise;
        }
      }
    }
  }

});