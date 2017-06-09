var app = require('app');

app.controller('loginCtrl', function ($rootScope, $scope, $log, $q, Auth, User, dialogs, Address) {

  angular.extend($scope, {

    // 表单是否提交过
    submitted: false,

    onfocus: function () {
      $scope.userInValid = false;
      $scope.inputRequired = false;
    },

    // 函数处理
    login: function ($event) {
      $scope.userInValid = false;
      $scope.submitted = true;
      $scope.inputRequired = false;
      $event.preventDefault();
      if ($scope.loginnormal.$invalid) {
        if ($scope.loginnormal.mobileNo.$error.required || $scope.loginnormal.password.$error.required) {
          $scope.inputRequired = true;
        }
        return $q.when({status: 412, message: "表单未按要求填写， 请检测"});
      }

      $scope.loging = true;

      // 密码加密之后处理
      return Auth.security().get(function (data) {
        var data = data.data;
        RSAUtils.setMaxDigits(200);
        var key = new RSAUtils.getKeyPair(data.publicKeyExponent, "", data.publicKeyModulus);
        $scope.password = RSAUtils.encryptedString(key, $scope.password);
        return data;
      }).$promise.then(function () {
        // 表单提交方式  返回promise
        return Auth.submit($event.target, {
          action: Address.API_ADDRESS + '/doLogin',
          iframeName: 'loginnormal'
        }).then(function (data) {
          $scope.loging = false;
          User.setUser(data.data);
          dialogs.close();
          return data;
        });
      });
    }

  });
});
