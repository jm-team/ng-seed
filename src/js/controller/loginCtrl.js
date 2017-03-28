var app = require('app');

// 模拟登录弹出框控制器
app.controller('cccc', function($scope, $q) {
    $scope.status = "初始状态"
    $scope.submit = function() {
        $scope.status = "执行中";


        // return Login.login();


        var defer = $q.defer();
        // // 模拟登录
        setTimeout(function() {
            debugger;
            // defer.reject({errMsg: "错误的参数"})
            defer.resolve({ msg: "success" })
        }, 3000);

        // 登录逻辑
        // $http.post({}).then(function(){
        //     defer.resolve({msg: "success"})
        // }, function(){

        // })

        return defer.promise;
    }
});

app.controller('loginCtrl',
    /*@ngInject*/
    function($scope, $modalInstance, $log, $q, Util, CENTER_ADDRESS, USERCENTER_ADDRESS, SERVER_ADDRESS, JmLoginService, Address) {
        var localAddr = Address.localHost;

        // 登录成功
        $scope.$on('getSessionIdSuccess', function() {
            $log.info('获取shirJID 成功');
            $modalInstance.close();
        });

        // 登录失败
        $scope.$on('getSessionIdError', function() {
            $scope.$apply(function() {
                if ($scope.clickNums === 3) {
                    $scope.isRequiredCode = true;
                }
                $scope.errTip = true;
                $scope.loging = false;
                $scope.userInValid = true;
                $scope.changeCode();
            });
        });

        // 环境地址匹配
        $scope.centerAddrs = CENTER_ADDRESS;
        $scope.usercenterAddress = USERCENTER_ADDRESS;
        $scope.serverAddress = SERVER_ADDRESS;

        // 弹出框关闭方法
        $scope.close = $modalInstance.close;

        angular.extend($scope, {
            // 来源 successful 指向同域的某一个资源{/dist/img/icon-open.png} 以便服务端回跳到客户端获取信息
            // from: SERVER_ADDRESS + '/webapi/v1/login?successful='+localAddr+'/dist/img/icon-open.png?t='+new Date(),
            from: localAddr + '/dist/img/icon-open.png?t=' + new Date(),

            // 表单是否提交过
            submitted: false,

            // 是否需要验证码
            isRequiredCode: false,

            // 点击次数
            clickNums: 0,

            // 认证中心请求地址
            USERCENTER_ADDRESS: USERCENTER_ADDRESS,

            // 切换验证码
            changeCode: function() {
                if ($scope.isRequiredCode) {
                    $scope.verifiCodeSrc = JmLoginService.getVerfiCode(USERCENTER_ADDRESS + '/cas/c/verifyCodeController?action=init&t=' + new Date());
                }
            },

            //检测是否需要验证码
            checkIsRequiredCode: function() {
                var userName = Util.trim()($scope.userName);
                if (userName) {
                    // 调用检测是否需要验证码
                    JmLoginService.checkIsRequiredVerfiCode({
                        serverUrl: USERCENTER_ADDRESS + '/cas/c/loginController?action=checkLoginNeedVerifyCode&callback=JSON_CALLBACK',
                        data: { username: userName }
                    }).then(function(data) {
                        // 判断是否要验证码
                        var isNeed = data.LOGIN_NEED_VERIFYCODE_BOOL;
                        $scope.isRequiredCode = isNeed;
                        if (isNeed) {
                            $scope.changeCode();
                        }
                    }, function() {
                        $scope.changeCode();
                        $scope.isRequiredCode = true;
                    });
                }
            },

            // 检测验证码
            checkCode: function() {
                var defer = $q.defer();
                var code = Util.trim()($scope.checkcode); //Util.trim($scope.checkcode);
                if (code) {
                    JmLoginService.checkValidVerfiCode({
                        data: {
                            checkcode: code
                        },
                        serverUrl: USERCENTER_ADDRESS + '/cas/c/loginController?action=validateVerifyCode&callback=JSON_CALLBACK'
                    }).then(function(data) {
                        defer.resolve(data);
                    }, function() {
                        defer.reject();
                    });
                }
                return defer.promise;
            },

            submit: function($event) {
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
                        .then(function() {
                            $event.target.form.submit();
                        }, function() {
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
    });