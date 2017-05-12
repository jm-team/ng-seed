/**
 * Created by Administrator on 2017/4/19 0019.
 */
var app = require('app');
var tpl = require("./tooltip.tpl2.html");
var tpl2 = require("./tooltip.tpl.html");

app.registerController('TooltipTestCtrl', TooltipTestCtrl);
// 调用Api 服务
app.registerController('TooltipCtrl',
  /*@ngInject*/
  function ($scope, $timeout, $q) {
    var vm = this;
    var resolve;

    vm.template = tpl;
    vm.template2 = tpl2;

    $scope.resolve = {
      content: function () {
        return "123"
      },

      title: function () {
        var defer = $q.defer();
        $timeout(function () {
          console.log('title promise');
          defer.resolve('title promise')
        }, 1000);

        return defer.promise;
      }
    };


  });

/*@ngInject*/
function TooltipTestCtrl($interval, tooltip) {
  var vm = this;
  vm.title = 123;
  vm.time = 5;
  vm.closing = 0;
  vm.title = tooltip.title;
  vm.content = tooltip.content;
  vm.ok = ok;

  //////////////////////////

  function ok($event) {
    $interval.cancel(interval);
    vm.closing = 1;
    $event.stopPropagation();
    var interval = $interval(function () {
      if (vm.time === 0) {
        $interval.cancel(interval);
        tooltip.destroy();
      }
      vm.time--;
    }, 1000);
  }
}