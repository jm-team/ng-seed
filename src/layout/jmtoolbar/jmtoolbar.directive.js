var app = require('app');
var jmToolbar = require('./jmtoolbar.html');
require('./jmtoolbar.scss');

app.directive('jmToolbar', function ($window) {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: jmToolbar,
        link: function(scope, element, attrs){
            var $elem = angular.element(element);
            var winWidth,winHeight,rightWidth,bottomH;
            function getSize(){

                if (window.innerWidth)
                    winWidth = window.innerWidth;
                else if ((document.body) && (document.body.clientWidth))
                    winWidth = document.body.clientWidth;
                if(window.innerHeight)
                    winHeight = window.innerHeight;
                else if(document.body&&document.body.clientHeight)
                    winHeight = document.body.clientHeight;
            }
            function setPos(){
                (winWidth-1190)/2-58>0?rightWidth=(winWidth-1190)/2-58:rightWidth=0;
                //winHeight>350?bottomH=(winHeight-350)/2:bottomH = 0;
                $elem.css('position','fixed');
                $elem.css('right',rightWidth+'px');
                // $elem.css('right','25px');
                //$elem.css('bottom',bottomH+'px');
                $elem.css('bottom','80px');
            }

            scope.onResize = function(){
                getSize();
                setPos();
            }
            angular.element($window).bind('resize', function() {
                scope.onResize();
            })
            getSize();
            setPos();
            // $elem.find('h3').on('click',function(){
            //     $elem.toggleClass('on');
            //     $elem.css('bottom',bottomH+'px');
            // })
            $elem.find('li').eq(9).on('click',function(){
                window.scrollTo(0,0);
            })
            angular.element(window).on('scroll',function(){
                var scrollTop = document.documentElement.scrollTop||window.scrollY;
                scrollTop>800? (function(){
                    $elem.addClass('on');
                }()):(function(){
                    $elem.removeClass('on');
                }())
            })
        }
    };
});
