/**
 * Created by Administrator on 2017/4/19 0019.
 */

var app = require('app');

app.registerController('RateCtrl', RateCtrl);

function RateCtrl($state) {
  var vm = this;
  // star

  vm.state = $state;
  vm.model0 = -1;
  vm.model = 2;
  vm.model1 = 3;
  vm.max = 5;
  vm.texts = ['极差', '失望', '一般', '满意', '惊喜'];
  vm.toggle = toggle;
  vm.disabled = true;

  function toggle() {
    vm.disabled = !vm.disabled;
  }
}
