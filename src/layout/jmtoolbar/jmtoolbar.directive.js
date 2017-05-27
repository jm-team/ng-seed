var app = require('app');
var jmToolbar = require('./jmtoolbar.html');
require('./jmtoolbar.scss');

app.directive('jmToolbar', function () {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: jmToolbar,
        link: function(scope, element, attrs){
            var $elem = angular.element(element);

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
