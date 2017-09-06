/**
 * Created by lf on 2017/7/26.
 */
'use strict';
var app = require('app');

app.directive('timePicker', function($compile, $filter){
    return {

        restrict:'AE',

        scope:{
            onChange: '&'
        },
        require:'?^ngModel',
        link: function(scope, element, attrs, ngModel){

            var parent = element.parent();
            // 模板创建
            // 最外层的容器
            var oContiner = angular.element('<div class="time-panel__content"></div>');
            var html = [];
            var contentHeight;
            var oLiHeight;
            var containerHeight;
            var maxBarTop;
            var date = new Date();
            var nowHour = date.getHours();
            var nowMin = date.getMinutes();
            var nowSecond = date.getSeconds();

            function addZero(input){
                var value = parseInt(input, 10);
                if(value < 10){
                    return '0'+value
                }

                return value;
            }

            function scroll(parent, type){
                var bar = parent.querySelector('.time-scrollbar__thumb');
                var content = parent.querySelector('.content');
                var oLi = parent.querySelector('li');
                var aLis = angular.element(content.querySelectorAll('li'));
                oLiHeight = oLi.offsetHeight;

                var barHeight = bar.offsetHeight;
                contentHeight = content.offsetHeight;
                containerHeight = parent.offsetHeight;
                maxBarTop = containerHeight - barHeight;
                var iNow = 3;
                scope.hour = 3;
                scope.minute = 3;
                scope.second = 3;


                setTimeout(function(){
                    oContiner.css('display', 'none');
                    oContiner.css('opacity', 1);
                    oContiner.css('filter', 'alpha(opacity=100)');
                    scope.$apply(function(){
                        ngModel.$setViewValue(addZero(scope.hour) + ":" + addZero(scope.minute) + ':'+ addZero(scope.second));
                    })
                    ngModel.$render()
                },0);

                scope.$on('document.click', function () {
                    oContiner.css('display', 'none')
                });


                var watch = scope.$watch(type, function(newVal, oldVal){
                    if( newVal){
                        iNow = newVal | 0;
                        watch();
                    }
                });

                aLis.on('click', function(ev){
                    ev.stopPropagation();
                    var target = angular.element(ev.target);
                    var type = target.attr('type');
                    var value = target.attr('value');
                    scope[type] = value;

                    scope.$apply(function(){
                        ngModel.$setViewValue(addZero(scope.hour) + ":" + addZero(scope.minute) + ':'+ addZero(scope.second));
                    });

                    ngModel.$render()

                });

                angular.forEach(aLis, function(item, index){
                    angular.element(item).on('click', function(){
                        iNow = index;
                        goCurrent(parent, iNow);
                    });
                });


                angular.element(aLis[iNow]).addClass('active');
                content.style.height += oLi*3+'px';


                if(/Firefox/i.test(navigator.userAgent)){
                    parent.addEventListener('DOMMouseScroll', mousewheelEvent, false)
                }else{
                    parent.onmousewheel = mousewheelEvent;
                }

                function mousewheelEvent(ev){
                    ev.stopPropagation();
                    ev.preventDefault();
                    // 向下
                    if(ev.deltaY >= 0 || ev.detail >= 0){
                        iNow +=1 ;
                        if(iNow >= aLis.length){
                            iNow = 0;
                        }
                        if(iNow == aLis.length){
                            return;
                        }

                    }else{
                        iNow -= 3;
                        if(iNow<=0){
                            iNow = 0;
                        }
                    }
                    goCurrent(parent, iNow, function(){
                        scope[type] = iNow;
                        scope.$apply(function(){
                            ngModel.$setViewValue(addZero(scope.hour) + ":" + addZero(scope.minute) + ':'+ addZero(scope.second));
                        });
                        ngModel.$render()
                    });
                }
            }

            function goCurrent(parent, iNow, callback){
                var bar = parent.querySelector('.time-scrollbar__thumb');
                var content = parent.querySelector('.content');
                var oLi = parent.querySelector('li');
                var aLis = angular.element(content.querySelectorAll('li'));

                var nowTop = (iNow*oLiHeight);
                if(nowTop >= 0 || nowTop <= contentHeight){

                    var top = (containerHeight* nowTop)/contentHeight;
                    bar.style.top = Math.min(top, maxBarTop) + 'px';
                    content.style.top = -(nowTop-oLiHeight*3) + 'px';
                }

                aLis.removeClass('active');
                angular.element(aLis[iNow]).addClass('active');

                callback && callback();

            }

            // 创建时分秒
            function createHtml(type){
                var Lis = [];
                var leng = 60;
                if(type === 'hour'){
                    leng = 24;
                }

                for(var i = 0; i < leng; i++){
                    var index = i > 9 ? i : '0'+i;
                    Lis.push('<li type="'+type+'" value="'+index+'">'+(index)+'</li>');
                }

                var html = '<div class="time-item" class="'+type+'"> <div class="time-item__content"><ul class="content">'+(Lis.join(''))+'</ul></div><div class="time-scrollbar__bar"><div class="time-scrollbar__thumb"></div></div></div>';


                return html;
            }

            element.on('focus', function () {
                oContiner.css('display', 'block')
            });

            element.on('click', function(ev){
                ev.stopPropagation();
            });

            html.push(createHtml('hour'));
            html.push(createHtml('minute'));
            html.push(createHtml('second'));

            oContiner.append(html.join(''));

            parent.append($compile(oContiner)(scope));


            var timeItems = [];
            angular.forEach(document.querySelectorAll('.time-item'), function (item) {
                timeItems.push(item);
            })

            var types = ['hour', 'minute', 'second']
            timeItems.forEach(function(item, index) {
                scroll(item, types[index])
            });

            ngModel.$formatters.push(function(newVal){
                if(!newVal){
                    return newVal;
                }

                var arr = $filter('date')(newVal, 'hh:mm:ss').split(':');
                goCurrent(timeItems[0],arr[0]|0);
                goCurrent(timeItems[1],arr[1]|0);
                goCurrent(timeItems[2],arr[2]|0);

                scope.hour = arr[0];
                scope.minute = arr[1];
                scope.second = arr[2];

                return newVal;

            });

            ngModel.$parsers.push(function(newVal){
                return newVal;
            });

        }

    }
});