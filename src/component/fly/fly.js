/**
 * 滚动
 * @authors Your Name (you@example.org)
 * @date    2017-02-09 16:56:29
 * @version $Id$
 */

angular.module('jmui.fly',[])
    .service('uiService',['commonService', '$parse', function( commonService, $parse ) {
        var service;
        service = {
            /**
            *obj 滚动元素
            *sName 滚动方向
            *target 距离
            *time 完成滚动时间
            *fn 滚动完成后的回调
            *prefn 滚动前处理事件
            */
            animate: function move(obj, sName, target, time,fn,prefn){
                  prefn?(function(){prefn();})():(function(){return;})();
                    var 
                        rOpacity = sName == 'opacity',
                        start = parseFloat(cService.GetCurrentStyle(obj,sName)),          
                        dis,
                        //count=Math.ceil(time/(cService.isIE8() ? 90 : 30)), 
                        count = time / 20,                  
                        n=0;
                    !start && (start = 0);
                    rOpacity && cService.isIE8() && !start && (start = 100);   
                    rOpacity &&  !cService.isIE8() && (target /= 100);
                   
                    dis = target - start;
                    
                    function finish(){
                        clearInterval(obj.timer);
                        obj.timer = null;                   
                        if (rOpacity){
                            if (cService.isIE8()){
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
            //获取浏览器
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
            //判断是否IE8
            isIE8: function() {
                var browser = this.getBrowser();
                if (browser.browser == 'msie' && browser.version == '8.0') return true;
                else return false;
            },
            //获取元素索引
            index: function index(current, obj){ 
                for (var i = 0; i < obj.length; i++) { 
                    if (obj[i] == current) { 
                        return i; 
                    } 
                } 
            },
            //获取具有特定属性值的元素
            attrItem: function attrItem(attr,attrV,obj){ 
                for (var i = 0; i < obj.length; i++) { 
                    if (angular.element(obj[i]).attr(attr) == attrV) {
                        return obj[i]; 
                    } 
                } 
            },
            //获取元素当前的样式
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
    app.directive('jmFly', ['uiService', 'commonService', '$interval', function(uiService, cService, $interval) { 
            /*
            <div class="img-scroll"  jm-fly items="partnerList" item-tag="div" move-name="left" delay-time="2000" move-time="2000" 
            fly-id="fly" triggers="triggers" triggers-element='triggers-element'  triggers-class="active" pre-btn="prev-btn"
            next-btn="next-btn" triggers-event="mouseenter" >
                <div class="fly-wrap">
                    <div class="fly" id="fly">
                        <div class="fly-item" rd-fly-item ng-repeat="item in partnerList||{} track by $index">
                            <div afkl-lazy-image="{{(item.url| cdn)|| ('/dist/img/default-logo.png' | cdn)}}" img-error="/dist/img/default-logo.png"></div>
                        </div>
                    </div>
                     <ul id="triggers-element"><li ng-repeat="item in partnerList||{} track by $index"><div afkl-lazy-image="{{(item.url| cdn)|| ('/dist/img/default-logo.png' | cdn)}}" img-error="/dist/img/default-logo.png"></div></li></ul>
                </div>
                <a class="prev-btn on" id="prev-btn"></a>
                <a class="next-btn on" id="next-btn"></a>
            </div>
            * items 滚动数据  必选
            * item-tag 滚动元素标签 必选
            * move-name 滚动方向 可选 默认向上滚动
            * delay-time 延迟滚动时间 可选
            * move-time 滚动时间 可选
            * fly-id 滚动元素id 必选
            * triggers 滚动元素关联按钮 按钮内无内容 自动生成 可选 默认没有
            * triggers-element 滚动元素关联按钮 按钮内有内容 自己生成 可选 
            * triggers-class 激活按钮的类名 可选
            * pre-btn  上一个按钮id  可选 默认没有
            * next-btn 下一个按钮id 可选 默认没有
            * triggers-event 关联按钮响应事件 可选 默认mouseenter
            */

            //初始化数据
            function setScopeValues(scope, attrs) {
                scope.moveTime = scope.moveTime || 1000;
                scope.delayTime = scope.delayTime || 3000;
                scope.moveName = scope.moveName == undefined ? 'top' : scope.moveName;
                scope.itemTag = scope.itemTag || 'li';
                scope.triggersClass = scope.triggersClass||'active';
                scope.triggersEvent = scope.triggersEvent||'mouseenter';

            }
            //滚动主体
            function fly(scope, elm, attrs,wrapWidth) {
                var
                    $items = [],
                    $triggers = angular.element('<ul></ul>'),
                    $trigger,
                    count, //move count
                    itemWith,   
                    itemHeight,
                    curIndex = 0,
                    i = 0,
                    rReverse = false,
                    rVertical = scope.moveName == 'top' || scope.moveName == 'bottom', 
                    rHorizontal = scope.moveName == 'left' || scope.moveName == 'right',
                    rOpacity = scope.moveName == 'opacity',
                    $preBtn,
                    $nextBtn,
                    $triggersElement;  
                //获取 上一个 下一个和关联按钮父元素 
                !!scope.preBtn?(function(){$preBtn = angular.element(document.getElementById(scope.preBtn))})():(function(){return;})();
                !!scope.nextBtn?(function(){$nextBtn = angular.element(document.getElementById(scope.nextBtn))})():(function(){return;})();
                !!scope.triggersElement?(function(){$triggersElement = angular.element(document.getElementById(scope.triggersElement))})():(function(){return;})();
                
                //改变滚动元素定位属性
                elm.css('position', 'relative');
                //生成滚动单体数组 生成关联按钮(按钮内无内容)并绑定事件
                angular.forEach(elm.find(scope.itemTag), function(item, i) {

                    item = angular.element(item);

                    if (item.attr('rd-fly-item') != undefined) {
                        $items.push(item);
                        item.attr('index',$items.length-1);                         
                        if (scope.triggers) {
                            $trigger = angular.element('<li></li>').on(scope.triggersEvent, function() {
                                $interval.cancel(scope.timer);
                                targetIndex = cService.index(this, $triggers.children());
                                moveTo(targetIndex);

                            }).on('mouseleave', function() {
                                autoMove();
                            })
                            $triggers.append($trigger);
                            $triggers.children().length == 1 && $trigger.addClass(scope.triggersClass);
                        }
                    }

                });
                if (scope.triggers && $items.length > 1) {
                    elm.parent().append($triggers); //triggers                   
                }
                //自定义的关联按钮绑定事件
                if(scope.triggersElement){
                    $triggersElement.children().on(scope.triggersEvent, function() {
                        $interval.cancel(scope.timer);
                        targetIndex = cService.index(this, $triggersElement.children());
                        console.log(targetIndex);
                        moveTo(targetIndex);

                    }).on('mouseleave', function() {
                        autoMove();
                    })
                    $triggersElement.children().eq(0).addClass(scope.triggersClass);
                }

                if ($items.length <= 1) {
                    $nextBtn.removeClass('on');
                    return;
                };

                //IF is moved in the horizontal direction,set the elm's with be total of  rd-fly-item's width
                //水平滚动时，把ul宽度设置成rd-fly-item的宽度之和

                // 横向滚动 获取滚动单体宽度
                if (rHorizontal) { 
                    itemWith = $items[0][0].offsetWidth + 1;
                    elm.css('width', itemWith * $items.length + 'px');
                }
                // 竖向滚动 获取滚动单体高度
                if(rVertical){
                    itemHeight = $items[0][0].offsetHeight + 1;                    
                    elm.css('height', itemHeight * $items.length + 'px');
                }

                
                // 滚动到第几个单体
                function moveTo(targetIndex) { 
                    var targetItem = cService.attrItem('index',targetIndex,elm.children());  
                    var  $triggersArray = $triggers.children(),  
                    index = cService.index(targetItem, elm.children());
                    // count = scope.moveDistance;
                    rVertical && (count = $items[0][0].offsetHeight);
                    rHorizontal && (count = $items[0][0].offsetWidth);
                    //判断该向左滚动还是向右滚动
                    if(targetIndex>curIndex){
                        uiService.animate(elm[0], scope.moveName, -count * index, scope.moveTime, function() {
                            curIndex = targetIndex;
                            for(var i=0; i<index; i++){
                                $items[0].parent().append($items[0]);                            
                                $items.push($items.shift());  
                            }
                            elm.css(scope.moveName, '0px');
                            
                        });
                    }else{                        
                        uiService.animate(elm[0], scope.moveName, count * (curIndex-targetIndex), scope.moveTime, function() {
                            curIndex = targetIndex;                            
                            elm.css(scope.moveName, '0px');                            
                        },function(){
                            for(var i=0; i<curIndex-targetIndex; i++){
                                $items[0].parent().prepend($items[0]);                            
                                $items.unshift($items.pop());  
                            }
                        });
                    }
                    // 滚动后更新关联按钮显示
                    if(scope.triggers){
                        $triggersArray.removeClass(scope.triggersClass);
                        $triggersArray.eq(targetIndex).addClass(scope.triggersClass);
                    }
                    if(scope.triggersElement){
                        $triggersElement.children().removeClass(scope.triggersClass);
                        $triggersElement.children().eq(targetIndex).addClass(scope.triggersClass);
                    }
                    
                }
                //自动滚动
                function autoMove() {
                    $itemsBack = $items;
                    $interval.cancel(scope.timer);
                    // 设置定时器自动滚动
                    scope.timer = $interval(function() {                        
                        if (scope.reverse) {
                            if ((curIndex == 0 && rReverse) || (curIndex == $items.length - 3 && !rReverse)) {                               
                                rReverse = !rReverse;
                            }
                            moveTo(rReverse ? --curIndex : ++curIndex);
                            
                        } else {                   
                            count = scope.moveDistance;
                            rVertical && (count = $items[0][0].offsetHeight);
                            rHorizontal && (count = $items[0][0].offsetWidth);
                            uiService.animate(elm[0], scope.moveName, -count, scope.moveTime, function() {
                                //滚动完成后更新显示
                                $items[0].parent().append($items[0]);
                                elm.css(scope.moveName, '0px');
                                $items.push($items.shift());    
                                var  $triggersArray = $triggers.children(),
                                targetIndex = $items[0].attr('index');
                                curIndex = targetIndex;
                                $triggersArray.removeClass('active');
                                $triggersArray.eq(targetIndex).addClass('active');  

                            });
                        }
                    }, scope.delayTime)
                }
                // 上一个按钮绑定事件
                $preBtn?$preBtn.bind('click',function(){
                    curIndex = parseInt(curIndex);
                    $interval.cancel(scope.timer);
                    if(curIndex>0){                        
                        moveTo(curIndex-1);
                        autoMove();
                    }else{
                        moveTo(9);
                        autoMove();
                    }                    
                }):(function(){})()
                // 下一个按钮绑定事件
                $nextBtn?$nextBtn.bind('click',function(){
                    curIndex = parseInt(curIndex);
                    $interval.cancel(scope.timer);
                    if(curIndex<$items.length-1){                                              
                        moveTo(curIndex+1);
                        autoMove();
                    }else{
                        moveTo(0);
                        autoMove();
                    }                 
                }):(function(){})()
                // 激发定时器
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
                    triggers: '=',//点击按钮
                    reverse: '=',//循环播还是正序反序播
                    triggersClass: '@',
                    flyId:'@',
                    triggersElement:'@',
                    preBtn:'@',
                    nextBtn:'@',
                    triggersEvent:'@',
                    moveDistance: '='
                },
                link: function(scope, elem, attrs) {
                    var wrapWidth = angular.element(elem)[0].offsetWidth;
                    var elm = angular.element(document.getElementById(scope.flyId));
                    scope.$watch('items', function(newVal, oldVal) {
                        build(scope, elm, attrs,wrapWidth);                        
                    });
                    scope.$on('$destroy', function() {
                        $interval.cancel(scope.timer);
                    });
                }
            }

}])

