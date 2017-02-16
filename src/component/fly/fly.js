/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-02-09 16:56:29
 * @version $Id$
 */
angular.module('jmui.fly',[])
    .service('uiService',['commonService', '$parse', function( commonService, $parse ) {
        var service;
        service = {
            animate: function move(obj, sName, target, time,fn){
                var rOpacity = sName == 'opacity',
                    start = parseFloat(commonService.GetCurrentStyle(obj,sName)),          
                    dis,
                    //count=Math.ceil(time/(cService.isIE8() ? 90 : 30)), 
                    count = time / 20,                  
                    n=0;
                !start && (start = 0);
                rOpacity && commonService.isIE8() && !start && (start = 100);   
                rOpacity &&  !commonService.isIE8() && (target /= 100);
               
                dis = target - start;
                
                function finish(){
                    clearInterval(obj.timer);
                    obj.timer = null;                   
                    if (rOpacity){
                        if (commonService.isIE8()){
                            obj.style['filter']='alpha(opacity='+ (start + dis) + ')';
                        }else{
                            obj.style[sName]=start + dis;
                        }
                    }else{
                        obj.style[sName]=start + dis + 'px';
                    }
                    typeof fn == 'function' && fn();                   
                }
                
                if (obj.timer){
                    clearInterval(obj.timer);
                    obj.timer = null; 
                }
                obj.timer=setInterval(function (){
                    n++;
                    
                    if (rOpacity)
                    {   
                        if (cService.isIE8()){
                            obj.style['filter']='alpha(opacity='+ (start + dis * n / count) + ')';
                        }else{

                            obj.style[sName]=start + dis * n / count;
                        }
                        
                    }
                    else
                    {
                        obj.style[sName]=start + dis * n / count + 'px';
                    }
                    
                    
                    n >= count && obj.timer && finish();
                    
                        
                }, 5);
                
            }

        };
        return service;
    }])
    .service('commonService',[function(){
        var service;
        service = {
            getIndex: function(dom, deep) {
                var i = 0;
                deep = deep || 1;
                for (var j = 1; j < deep; j++) {
                    dom = dom.parentNode;
                }
                while ((dom = dom.previousSibling) != null) {
                    dom.nodeType == 1 && i++;
                }
                return i;
            },
            getBrowser: function() {
                // Useragent RegExp
                var rwebkit = /(webkit)[ \/]([\w.]+)/,
                    ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                    rmsie = /(msie) ([\w.]+)/,
                    rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/;

                function uaMatch(ua) {
                    ua = ua.toLowerCase();

                    var match = rwebkit.exec(ua) ||
                        ropera.exec(ua) ||
                        rmsie.exec(ua) ||
                        ua.indexOf("compatible") < 0 && rmozilla.exec(ua) ||
                        [];

                    return {
                        browser: match[1] || "",
                        version: match[2] || "0"
                    };
                };

                var userAgent = $window.navigator.userAgent;
                return uaMatch(userAgent);
            },
            isIE8: function() {
                var browser = this.getBrowser();
                if (browser.browser == 'msie' && browser.version == '8.0') return true;
                else return false;
            },
            index: function index(current, obj){ 
                for (var i = 0; i < obj.length; i++) { 
                    if (obj[i] == current) { 
                        return i; 
                    } 
                } 
            },
            GetCurrentStyle: function(obj, prop) {
                if (obj.currentStyle) { //IE
                    prop = prop.replace(/\-(\w)/g, function(all, letter) {
                        return letter.toUpperCase();
                    });
                    return obj.currentStyle[prop];
                } else if (document.defaultView && document.defaultView.getComputedStyle) {
                    var propprop = prop.replace(/([A-Z])/g, "-$1");
                    propprop = prop.toLowerCase();
                    return document.defaultView.getComputedStyle(obj, null)[propprop];
                }
                return null;
            }

        };
        return service;
    }])
    .directive('jmUiFly', ['uiService', 'commonService', '$interval', function(uiService, commonService, $interval) {            
                function setScopeValues(scope, attrs) {
                    scope.moveTime = scope.moveTime || 1000;
                    scope.delayTime = scope.delayTime || 3000;
                    scope.moveName = scope.moveName == undefined ? 'top' : scope.moveName;
                    scope.itemTag = scope.itemTag || 'li';
                }


                function fly(scope, elm, attrs,wrapWidth) {
                    var
                        $items = [],
                        $triggers = angular.element('<ul class="' + scope.triggersClass + '"></ul>'),
                        $trigger,
                        count, //move count
                        itemWith = 350,
                        itemHeight,
                        curIndex = 0,
                        i = 0,
                        rReverse = false,
                        rVertical = scope.moveName == 'top' || scope.moveName == 'bottom',
                        rHorizontal = scope.moveName == 'left' || scope.moveName == 'right',
                        rOpacity = scope.moveName == 'opacity';
                        $preBtn = elm.parent().next(".prev-btn"));
                        $nextBtn = $preBtn.next();
                    elm.css('position', 'relative');
                    angular.forEach(elm.find(scope.itemTag), function(item, i) {
                        item = angular.element(item);
                        if (item.attr('rd-fly-item') != undefined) {
                            $items.push(item);
                            if (scope.triggers) {
                                $trigger = angular.element('<li></li>').on('mouseenter', function() {
                                    $interval.cancel(scope.timer);
                                    targetIndex = commonService.index(this, $triggers.children());
                                    moveTo(targetIndex);

                                }).on('mouseleave', function() {
                                    autoMove();
                                })
                                $triggers.append($trigger);
                                $triggers.children().length == 1 && $trigger.addClass('active');
                            }
                        }

                    });



                    if ($items.length <= 1) {
                        $nextBtn.removeClass('on');
                        return
                    };

                    //IF is moved in the horizontal direction,set the elm's with be total of  rd-fly-item's width
                    //水平滚动时，把ul宽度设置成rd-fly-item的宽度之和
                    if (rHorizontal) { 

                        itemWith = $items[0][0].offsetWidth + 1; 
                        elm.css('width', itemWith * $items.length + 'px');
                        parseInt(elm.css("width"))-wrapWidth<itemWith?$nextBtn.removeClass('on'): $nextBtn.addClass('on');
                        // 2016-5-16 14:51:52 wyk@erongdu.com  注释掉下面的
                        // angular.forEach($items, function(item, i) {
                        //  item.css('width', itemWith + 'px');
                        // });
                    }
                    if(rVertical){
                        itemHeight = $items[0][0].offsetHeight + 1;                    
                        elm.css('height', itemHeight * $items.length + 'px');
                    }

                    if (scope.triggers && $items.length > 1) {
                        elm.parent().append($triggers); //triggers
                        $triggers.css('margin-left', -$triggers[0].offsetWidth / 2 + 'px')
                    }

                    function moveTo(index) {                    
                        var
                        $triggersArray = $triggers.children();
                        count = scope.moveDistance;
                        rVertical && (count = $items[0][0].offsetHeight);
                        rHorizontal && (count = $items[0][0].offsetWidth);
                        uiService.animate(elm[0], scope.moveName, -count * index, scope.moveTime, function() {
                            curIndex = index;
                            if(curIndex==$items.length-3){                            
                                $nextBtn.removeClass('on');
                                $preBtn.addClass('on');
                            }
                            if(curIndex==0){
                                $preBtn.removeClass('on');
                            }
                            if(curIndex>0&&curIndex<$items.length-3){
                                $nextBtn.addClass('on');
                                $preBtn.addClass('on');
                            }
                        });
                        $triggersArray.removeClass('active');
                        $triggersArray.eq(index).addClass('active');


                    }
                    
                    function autoMove() {
                        $interval.cancel(scope.timer);
                        scope.timer = $interval(function() {
                            if (scope.triggers) {

                                if ((curIndex == 0 && rReverse) || (curIndex == $items.length - 3 && !rReverse)) {                               
                                    rReverse = !rReverse;
                                }
                                moveTo(rReverse ? --curIndex : ++curIndex);
                                
                            } else {                            
                                count = scope.moveDistance;
                                rVertical && (count = $items[0][0].offsetHeight);
                                rHorizontal && (count = $items[0][0].offsetWidth);
                                uiService.animate(elm[0], scope.moveName, -count, scope.moveTime, function() {
                                    $items[0].parent().append($items[0]);
                                    elm.css(scope.moveName, '0px');
                                    $items.push($items.shift());
                                });
                            }
                        }, scope.delayTime)
                    }
                    $preBtn.bind('click',function(){
                        if(curIndex>0){
                            $interval.cancel(scope.timer);
                            moveTo(--curIndex);
                            autoMove();
                        }
                        
                    })
                    $nextBtn.bind('click',function(){
                        if(curIndex<$items.length-3){
                            $interval.cancel(scope.timer);
                            moveTo(++curIndex);
                            autoMove();
                        }
                        
                    })
                    //wait the css render thread
                    setTimeout(function() {                    
                        if ((rVertical && elm[0].offsetHeight - elm.parent()[0].offsetHeight>itemHeight) || (rHorizontal && elm[0].offsetWidth - elm.parent()[0].offsetWidth>itemWith)) {
                            autoMove();
                            elm.on('mouseenter', function() {
                                $interval.cancel(scope.timer);
                            }).on('mouseleave', function() {
                                autoMove();
                            });
                        }
                    }, 100);
                }

                function build(scope, elm, attrs,wrapWidth) {
                    setScopeValues(scope, attrs);
                    fly(scope, elm, attrs,wrapWidth);
                }
                return {
                    scope: {
                        moveTime: '@',
                        delayTime: '@',
                        moveName: '@',
                        items: '=',
                        itemTag: '@',
                        triggers: '@',
                        triggersClass: '@',
                        moveDistance: '='
                    },
                    link: function(scope, elem, attrs) {
                        var wrapWidth = angular.element(elem)[0].offsetWidth;
                        var elm = elem.children('.fly-wrap').children('fly');
                        scope.$watch('items', function(newVal, oldVal) {
                            build(scope, elm, attrs,wrapWidth);
                            // if (newVal != oldVal) {
                            //     build(scope, elm, attrs,wrapWidth);
                            // }
                        });
                        scope.$on('$destroy', function() {
                            $interval.cancel(scope.timer);
                        });
                    }
                }

    }])

