(function () {
  var app = require('app');
  var tpl = require("page/about/tooltip.html");
  // 调用Api 服务
  app.registerController('AboutCtrl', AboutCtrl);

  /*@ngInject*/
  function AboutCtrl(Api, $interval, $q, $timeout) {
    var vm = this;
    var resolve;

    vm.title = "About Page";
    vm.desc = "关于。。。。";
    vm.on = true;
    vm.template = tpl;
    vm.resolves = resolve;
    vm.toggleDisabled = toggleDisabled;
    vm.change = change;
    vm.showText = false;

    // star
    vm.model0 = -1;
    vm.model = 2;
    vm.model1 = 3;
    vm.max = 5;
    vm.texts = ['极差', '失望', '一般', '满意', '惊喜'];


    ///////////////////////////

    function change() {
      vm.model = 4;
    }

    function toggleDisabled() {
      vm.disabled = !vm.disabled;
    }

    resolve = {
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
    };
  }
})();


(function () {
  var app = require('app');
  app.registerController('TooltipCtrl', TooltipCtrl);

  /*@ngInject*/
  function TooltipCtrl(Api, $sce, $q, $interval, tooltip) {
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
})();
