/**
 * 解决模板中script不执行问题
 * <script type="text/javascript-lazy" src="http://v3.jiathis.com/code/jia.js" charset="utf-8"></script>
 * type="text/javascript-lazy"
 */
angular.module('jmui.loadScript', [])
    .directive('script', [function() {
    return {
        restrict: 'E',
        scope: false,
        link: function(scope, element, attrs) {
            if (attrs.type === 'text/javascript-lazy') {
                var s = document.createElement('script'); // use global document since Angular's $document is weak
                s.src = attrs.src;
                document.body.appendChild(s);
            }
        }
    };
}]);