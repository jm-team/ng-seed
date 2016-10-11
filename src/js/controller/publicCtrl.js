var app = require('../app');
console.log(app);
app.controller('loginCtrl', ['$scope', '$modalInstance', 'Util', '$q', 'Login', 'CENTER_ADDRESS', 'USERCENTER_ADDRESS', 'SERVER_ADDRESS', 'JmLoginService', '$log',
    function ($scope, $modalInstance, Util, $q, Login, CENTER_ADDRESS, USERCENTER_ADDRESS, SERVER_ADDRESS, JmLoginService, $log) {
        $scope.$on('getSessionIdSuccess', function () {
            $log.info('获取shirJID 成功');
            $modalInstance.close();
        });

        $scope.$on('getSessionIdError', function () {
            $scope.$apply(function () {
                if ($scope.clickNums === 3) {
                    $scope.isRequiredCode = true;
                }
                $scope.errTip = true;
                $scope.loging = false;
                $scope.userInValid = true;
                $scope.changeCode();
            });
        });

        $scope.centerAddrs = CENTER_ADDRESS;
        $scope.usercenterAddress = USERCENTER_ADDRESS;
        $scope.serverAddress = SERVER_ADDRESS;
        $scope.close = $modalInstance.close;

        angular.extend($scope, {
            // 表单是否提交过
            submitted: false,

            // 是否需要验证码
            isRequiredCode: false,

            // 点击次数
            clickNums: 0,

            // 认证中心请求地址
            USERCENTER_ADDRESS: USERCENTER_ADDRESS,

            // 切换验证码
            changeCode: function () {
                if ($scope.isRequiredCode) {
                    $scope.verifiCodeSrc = JmLoginService.getVerfiCode(USERCENTER_ADDRESS + '/cas/c/verifyCodeController?action=init&t=' + new Date());
                }
            },

            //检测是否需要验证码
            checkIsRequiredCode: function () {
                var userName = Util.trim()($scope.userName);
                if (userName) {
                    JmLoginService.checkIsRequiredVerfiCode({
                        serverUrl: USERCENTER_ADDRESS + '/cas/c/loginController?action=checkLoginNeedVerifyCode&callback=JSON_CALLBACK',
                        data: {username: userName}
                    }).then(function (data) {
                        // 判断是否要验证码
                        var isNeed = data.LOGIN_NEED_VERIFYCODE_BOOL;
                        $scope.isRequiredCode = isNeed;
                        if (isNeed) {
                            $scope.changeCode();
                        }
                    }, function () {
                        $scope.changeCode();
                        $scope.isRequiredCode = true;
                    });
                }
            },

            // 检测验证码
            checkCode: function () {
                var defer = $q.defer();
                var code = Util.trim()($scope.checkcode); //Util.trim($scope.checkcode);
                if (code) {
                    JmLoginService.checkValidVerfiCode({
                        data: {
                            checkcode: code
                        },
                        serverUrl: USERCENTER_ADDRESS + '/cas/c/loginController?action=validateVerifyCode&callback=JSON_CALLBACK'
                    }).then(function (data) {
                        defer.resolve(data);
                    }, function () {
                        defer.reject();
                    });
                }
                return defer.promise;
            },

            submit: function ($event) {
                $scope.errTip = false;
                $scope.userInValid = false;
                $scope.verifyCode = false;
                $scope.submitted = true;

                if ($scope.loginnormal.$invalid) {
                    $event.preventDefault();
                    return;
                }
                $scope.loging = true;
                $scope.clickNums++;

                if ($scope.isRequiredCode) {
                    $scope.checkCode()
                        .then(function () {
                            $event.target.form.submit();
                        }, function () {
                            $scope.errTip = true;
                            $scope.verifyCode = true;
                            $scope.loging = false;
                            $scope.changeCode();
                            $scope.checkcode = '';
                        });
                } else {
                    $event.target.form.submit();
                }
            }

        });
    }
]);