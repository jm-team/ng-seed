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
      var oNext = element.find('.next');
      var oProvice = element.find('.provice');
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

      var aIndexs = [];
      var endTime = 0;

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

        oCarousel.append(oIndexs);

        aIndexs = [].slice.apply(oIndexs.children());

        aIndexs.forEach(function(item, index){
          item.onclick = function(){
            if(!isAnimating){
              setCurrent(index, true)
            }
          }
        });

        var carouselControl = ["<button class='carousel-control left'></button><button class='carousel-control right'></button>"];



        if(typeof oUl[0].addEventListener === "function"){
          oUl[0].addEventListener('transitionend', function(){
            isAnimating = false;
            endTime = new Date().getTime();

            angular.forEach(oLists, function(iten, index){
              oLists[index].style.transition = "none";
            });
            oLists[preIndex].style.left = "100%";
          }, false);
        }


        oNext.on('click', function(){
          if(!isAnimating){
            setCurrent(currentIndex+1, true)
          }
        });

        oProvice.on('click', function(){
          if(!isAnimating){
            setCurrent(currentIndex-1, false)
          }
        });

        oCarousel.on('mouseenter', function(){
          clearTimeout(timer2)
        });

        oCarousel.on('mouseleave', function(){
          autoPlay();
        });

        setCurrent(0, true);
        autoPlay()
      }


      function setCurrent(index, isNext){
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

        clearTimeout(timer);
        timer = setTimeout(function(){
          oLists[currentIndex].style.transition = "left .6s ease-in-out";
          oLists[currentIndex].style.left = "0";

          angular.element(oLists[currentIndex]).addClass('active');
          angular.element(aIndexs[currentIndex]).addClass('active');

          oLists[preIndex].style.transition = "left .6s ease-in-out";

          if(isNext){
            oLists[preIndex].style.left = "-100%";
          } else{
            oLists[preIndex].style.left = "100%";
          }

          angular.element(oLists[preIndex]).removeClass('active');
          angular.element(aIndexs[preIndex]).removeClass('active');
          isAnimating = true;
        },0)
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
