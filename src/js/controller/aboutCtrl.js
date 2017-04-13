var app = require('app');
var tpl = require("page/about/tooltip.html");
// 调用Api 服务
app.registerController('AboutCtrl',
    /*@ngInject*/
    function ($scope, Api, $interval, $q, $timeout) {
        
        angular.extend($scope, {
            title: 'About Page',
            desc: '关于。。。。',
            template: tpl,
            on: true,
            toggleDisabled: function(){
                $scope.disabled = !$scope.disabled;
            },
            resolves: {
                content: function () {
                    return "123"
                },

                title: function () {
                    var defer = $q.defer();
                    $timeout(function () {
                        console.log('title promise')
                        defer.resolve('title promise')
                    }, 300)

                    return defer.promise;
                }
            }
        });

        // $interval(function () {
        //     $scope.text = Math.random();
        // }, 3000)
    });





app.registerController('tooltipCtrl',
    /*@ngInject*/

    /**, title, content */
    function ($scope, Api, $sce, $q, $interval,  tooltip) {
        console.log(tooltip.content);
        angular.extend($scope, {
            title:tooltip.title,
            time:5,
            closing:false,
            content: tooltip.content,
            ok: function ($event) {
                $interval.cancel(interval);
                $scope.closing = 1;
                $event.stopPropagation();
                var interval = $interval(function(){
                    if($scope.time === 0){
                        $interval.cancel(interval);
                        tooltip.destroy();
                    }
                    $scope.time--;
                }, 1000)
            }
        });

        // $interval(function () {
        //     $scope.text = Math.random();
        // }, 3000)
    });
