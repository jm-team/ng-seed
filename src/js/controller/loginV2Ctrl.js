var app = require('app');

app.controller('loginV2Ctrl', function ($rootScope, $scope, $modalInstance, $log, $q, Auth, Api) {
    // 弹出框关闭方法
    $scope.close = $modalInstance.close;

    angular.extend($scope, {

        // 表单是否提交过
        submitted: false,

        // email validation pattern
        emailPattern: {
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        },

        onfocus: function () {
            $scope.userInValid = false;
            $scope.inputRequired = false;
        },

        // todo:
        submit: function ($event) {
            $scope.userInValid = false;
            $scope.submitted = true;
            $scope.inputRequired = false;
            if ($scope.loginnormal.$invalid) {
                $event.preventDefault();
                if ($scope.loginnormal.username.$error.required || $scope.loginnormal.password.$error.required) {
                    $scope.inputRequired = true;
                }

                return;
            }
            $scope.loging = true;

            // invoke login api
            Api.doLogin($scope.username, $scope.password).then(function (response) {
                if (response.data && response.data.code === 0) {
                    // login success
                    // get user data

                    Api.User().get({t: +new Date()}, function (userData) {
                        Auth.user = userData;
                        $rootScope.$broadcast('userLoginFinished', userData);
                    });

                    $modalInstance.close();
                } else {
                    // login fail
                    $scope.loging = false;
                    $scope.userInValid = true;

                }
            }, function (data) {
                //console.log('fail',data);
                $scope.loging = false;
                $scope.userInValid = true;
            })

        }

    });
});