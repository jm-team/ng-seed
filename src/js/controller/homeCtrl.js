var app = require('../app')
// var loginTmp = require('../../page/service/login.html');
// 调用Api 服务
app.registerController('HomeCtrl', 
  /*@ngInject*/
  function($scope, Api, $modal){

  angular.extend($scope, {
    title:'HOME Page',
    desc:'这是主页',
    data:[1,2,3,4,5],

    modal: function($event){
      $event.preventDefault();
      $modal.open({
        templateUrl: app.tmps.loginTmp,

        controller: 'loginCtrl',

        windowClass : 'login-modal'
      });
    }
  });
});
