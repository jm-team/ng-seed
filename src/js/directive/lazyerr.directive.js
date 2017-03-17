var app = require('app');

// ng-lazy-load 图片懒加载失败的判断处理
app.directive('lazyErr', function() {
    return {
        restrict: 'AE',
        link: function(scope, element, attrs) {
            return attrs.$observe("afklLazyImageLoaded", function(value) {
                // value为fail，图片加载失败；为done，图片加载成功
                console.log("lazyImageLoaded:" + value);
            });
        }
    }
})