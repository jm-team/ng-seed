/**
 * Created by Administrator on 2017/5/19 0019.
 */
require('./index.scss');
angular.module('jmui.carousel', [])
  .directive('jmCarousel', function(){
  return {
    restrict:'AE',

    scope:{
      interval:'@'
    },

    link: function(scope, element, attrs){
      var oNext = null;
      var oProvice = null;
      var oUl = element.find('.jm-carousel-inner');
      var oCarousel = element;
      var interval = scope.$eval(attrs.interval) || 5000;
      var oLists = element.find('.item');
      var currentIndex = 0;
      var preIndex = -1;
      var start = null;
      var timer = null;
      var timer2 = null;
      var indexs = [];
      var isAnimating = false;

      var isSupportTransition = !!window.TransitionEvent;

      var aIndexs = [];
      var endTime = 0;
      var carouselControl = ["<button class='carousel-control provice'></button><button class='carousel-control next'></button>"];

      if(!element.attr('start')){
        setTimeout(init, 0);
      }else{
        var s = attrs.$observe("start", function(val){
          if(!!scope.$eval(val)){
            setTimeout(init, 0);
            s();
          }
        });
      }

      element.addClass('jm-carousel');

      function init(){
        var oIndexs;

        oLists = element.find('.item');
        if(oLists.length <= 1){
          return ;
        }

        angular.forEach(oLists, function(value, index){
          var className = "index-item"+ (!index ? ' active':'');
          indexs.push("<span class='"+className+"'></span>");
        });

        oIndexs = angular.element('<div class="jm-carousel-indicators"></div>').html(indexs.join(''));

        oCarousel.append(oIndexs).append(carouselControl.join());


        aIndexs = [].slice.apply(oIndexs.children());

        oNext = element.find('.next');
        oProvice = element.find('.provice');

        aIndexs.forEach(function(item, index){
          item.onclick = function(){
            if(index > currentIndex){
              setCurrent(index, true)
            }else{
              setCurrent(index, false)
            }
            // setCurrent(index, true)
          }
        });

        if(typeof oUl[0].addEventListener === "function"){
          oUl[0].addEventListener('transitionend', function(ev){

            oLists.css('transition', 'none');
            isAnimating = false;
            endTime = new Date().getTime();

            oLists[preIndex].style.left = "100%";
          }, false);
        }


        oNext.on('click', function(){
          setCurrent(currentIndex+1, true);
        });

        oProvice.on('click', function(ev){
          ev.stopPropagation();
          ev.preventDefault();
          setCurrent(currentIndex-1, false)
        });

        oCarousel.on('mouseenter', function(){
          clearTimeout(timer2);
        });

        oCarousel.on('mouseleave', function(){
          autoPlay();
        });

        setCurrent(0, true);
        autoPlay()
      }


      function setCurrent(index, isNext){

        clearTimeout(timer);
        if(isAnimating){
          return ;
        }
        if(preIndex === -1){
          angular.element(oLists[currentIndex]).addClass('active');
          oLists[currentIndex].style.left = "0";
          preIndex = currentIndex;
          currentIndex = index;
          return ;
        }


        preIndex = currentIndex;
        currentIndex = index;



        if(isNext){
          if(currentIndex >= oLists.length){
            currentIndex = 0;
          }
          oLists[currentIndex].style.left = "100%";
        } else{
          if(currentIndex === -1){
            currentIndex = oLists.length - 1
          }
          oLists[currentIndex].style.left = "-100%";
        }


        timer = setTimeout(function(){
          // 解决火狐浏览器 对使用JS操作CSS时渲染优化，
          // 可能会对上面left的赋值不会立即渲染。
          // 这样会导致之后的left的赋值执行的时候 之前的赋值就无效了。
          // 这里使用getComputedStyle 强制浏览器渲染。
          // 参考： https://www.web-tinker.com/article/20286.html
          if(angular.isFunction(getComputedStyle)){
            getComputedStyle(oLists[currentIndex]).left;
          }

          angular.element(oLists[currentIndex]).addClass('active');
          angular.element(aIndexs[currentIndex]).addClass('active');

          oLists[preIndex].style.transition = "left .6s ease-in-out";
          if(isNext){
            oLists[preIndex].style.left = "-100%";
          } else{
            oLists[preIndex].style.left = "100%";
          }

          oLists[currentIndex].style.transition = "left .6s ease-in-out";
          oLists[currentIndex].style.left = "0";

          angular.element(oLists[preIndex]).removeClass('active');
          angular.element(aIndexs[preIndex]).removeClass('active');
          if(isSupportTransition){
            isAnimating = true;
          }
        },30);
      }

      function autoPlay(){
        clearTimeout(timer2);
        timer2 = setTimeout(function(){
          setCurrent(currentIndex+1, true);
          autoPlay()
        },interval)
      }
    }
  }
});
