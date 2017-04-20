
/**
 * Created by Administrator on 2017/4/19 0019.
 */

var app = require('app');
var loginV2Tmp = require('component/login/login.html');

app.registerController('DialogCtrl', DialogCtrl);

function DialogCtrl(dialogs) {
  var vm = this;

  vm.confirm = function(){
    dialogs.confirm({
      template: '<p class="text-center text-default">确认删除？</p>'
    }).then(function () {
      alert("您点了确认");
      dialogs.close();
    }, function(){
      alert("您点了取消");
      dialogs.close();
    });
  };

  vm.alert = function(){
    dialogs.alert({
      template: '<p class="text-center text-default">确认删除？</p>'
    }).then(function(){
      dialogs.close();
    })
  };

  vm.custom = function(){
    dialogs.modal({
      method: 'login',
      className: 'login-from',
      backdropClass: 'in',
      templateUrl: loginV2Tmp,
      success: function (data) {
        var result = data.data.data;
        alert('tick')
      },
      controller: 'loginCtrl'
    })
  };

}

