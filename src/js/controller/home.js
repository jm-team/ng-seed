var app = require('app');

/**
 * [首页控制器]
 * @param  {[type]} $scope          [ 当前作用域 ] 
 * @param  {[type]} AuthService     [ 验证服务 ]
 * @param  {[type]} API             [ API 服务 ]
 * @param  {[type]} Cookie          [ Cookie操作服务 ]
 * @param  {[type]} $q              [ Angular 自带promise ]
 * @param  {[type]} Public          [ 公用服务 ]
 * @param  {[type]} data            [ 首页滚动列表数据 ]
 * @param  {[type]} dataCacha       [ 数据缓存 ]
 * @param  {[type]} SessionService  [ 用户信息状态服务]
 * @return {[type]}                 []
 */
app.registerController('HomeCtrl', [
    '$scope',
    'AuthService',
    'API',
    'Cookie',
    '$q',
    'Public',
    'data',
    'dataCacha',
    'SessionService',
    function($scope, AuthService, API, Cookie, $q, Public, data, dataCacha, SessionService) {
        var slides = $scope.slides = [];

        var banners = [{
            src: 'http://image1.maisulang.com/upload/PC/2016/06/30/14/43282045090490401.jpg'
        }, {
            src: 'http://image1.maisulang.com/upload/PC/2016/06/28/21/43133492790704611.jpg'
        }]

        console.log(data);
        angular.extend($scope, {
            myInterval: 5000,

            addSlide: function(item) {
                slides.push({
                    image: item.src
                });
            },

            capacity: data.capacity,

            stroage: data.stroage,

            auction: data.auction,

            // 获取热门关键字
            getKeys: function() {
                if (dataCacha["keys"].length) {
                    return $q.when(dataCacha["keys"])
                } else {
                    return API.HotKeyword().query(function(data) {
                        return data;
                    })
                }
            }
        });

        // 获取热门关键字
        $scope.keys = $scope.getKeys();

        // 获取合作伙伴
        API.Artner().get(function(data) {
            $scope.artner = data.result || [];
        })

        // angular.forEach(banners, function(item){
        //   $scope.addSlide(item)
        // })





        // $scope.title = 'Home.page  XXXXXXXXXXX';
        //
        // $scope.today = function() {
        //     $scope.dt = new Date();
        // };
        // $scope.today();

        // $scope.clear = function() {
        //     $scope.dt = null;
        // };

        // // Disable weekend selection
        // $scope.disabled = function(date, mode) {
        //     console.log(date);
        //     console.log(mode)
        //         //return (mode === 'day');
        // };

        // $scope.toggleMin = function() {
        //     $scope.minDate = $scope.minDate ? null : new Date();
        // };
        // $scope.toggleMin();

        // $scope.open = function($event) {
        //     $event.preventDefault();
        //     $event.stopPropagation();

        //     $scope.opened = true;
        // };

        // $scope.dateOptions = {
        //     showWeeks: false,
        //     formatYear: 'yy',
        //     startingDay: 1
        // };

        // $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        // $scope.format = $scope.formats[0];
        //
        // angular.extend($scope, {
        //
        //
        //     datas: [{
        //         src: '/dist/img/1.jpg'
        //     }, {
        //         src: '/dist/img/2.jpg'
        //     }, {
        //         src: '/dist/img/3.jpg'
        //     }],
        //
        //     lists: [{
        //         name: 'zl',
        //         age: 12
        //     }, {
        //         name: 'yl',
        //         age: 12
        //     }, {
        //         name: 'xx',
        //         age: 15
        //     }],
        //
        //     getDate: function() {
        //         datePickService.createDatePick($scope.date);
        //     },
        //
        //     get: function() {
        //         SessionService.setUser({
        //                 name: 'zl',
        //                 age: 12
        //             })
        //             // demo.get({canCancel: true});
        //     },
        //     post: function() {
        //         // $http.post('http://192.168.23.234:8080/webapi/user/getUserInfo?shiroJID='+Cookie.getCookie('shiroJID'), {
        //         //     name: 123,
        //         //     age:456
        //         // })
        //         // return ;
        //         AuthService.save({
        //             //== token:Public.token,
        //             // shiroJID:Cookie.getCookie('shiroJID')
        //         }, {
        //             canCancel: true,
        //             name: 123,
        //             age: 456
        //         });
        //     },
        //
        //     getBase: function() {
        //         Public.getBase(['company_type', 'business_scope']).then(function(data) {
        //             console.log(data)
        //         });
        //     },
        //
        //     getBaseOther: function() {
        //         Public.getBase(['company_type', 'business_scope', 'service_level']).then(function(data) {
        //             console.log(data)
        //         });
        //     },
        //
        //     batch: function() {
        //         Public.Batch().save({}, {
        //             data: [{
        //                 "data": {
        //                     name: 1
        //                 },
        //                 "method": "post",
        //                 "uri": "/subTest1/1"
        //             }, {
        //                 "data": {
        //                     name: 25
        //                 },
        //                 "method": "get",
        //                 "uri": "/subTest2/2"
        //             }]
        //         });
        //     }
        // })
    }
]);