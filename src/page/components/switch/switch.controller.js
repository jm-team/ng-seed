/**
 * Created by Administrator on 2017/4/19 0019.
 */
var app = require('app');

// 调用Api 服务
app.registerController('SwitchCtrl',
  /*@ngInject*/
  function() {
    var vm = this;
    vm.on = true;
    vm.off = false;
    vm.disabled = true;
    vm.toggleDisabled = toggleDisabled;

    function toggleDisabled() {
      vm.disabled = !vm.disabled;
    }
  });
