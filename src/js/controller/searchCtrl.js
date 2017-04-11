var app = require('app');

// 调用Api 服务
app.registerController('SearchCtrl',
    /*@ngInject*/
    function ($scope, $http, $q, $stateParams, $state, $timeout, dialogs, $location) {

        angular.extend($scope, {
            // 初始化参数
            search: {
                categoryId: 0,
                industryId: 0
            },
            // 基础数据
            base: {
                categorys: [],
                industrys: []
            },

            changeType: function (list, type) {
                $scope.search[type] = list[type];
                $state.go('search', $scope.search);
            },

            getList: function (data) {
                // 分类列表
                $http.get('/dist/mock/search.json', {params: data}).then(function (result) {
                    $scope.lists = result.data;
                }, function () {
                    alert('Error');
                });

            }
        });

        // 获取Category
        function getCategory() {
            return $http.get('/dist/mock/categorys.json');
        }

        // 获取Industry
        function getIndustry() {
            return $http.get('/dist/mock/industrys.json');
        }

        // 处理搜索参数
        function processBase(data) {
            $scope.base.categorys = data[0].data;
            $scope.base.industrys = data[1].data;
            return $scope.base;
        }

        // 将地址栏上的数据覆盖到搜索条件
        function coverParams(data) {
            angular.forEach($stateParams, function (value, key) {
                if (value) {
                    $scope.search[key] = value;
                }
            });
            return $scope.search;
        }

        function initSearch() {
            if (!$scope.base.categorys.length && !$scope.base.industrys.length) {
                $q.all([getCategory(), getIndustry()])
                    .then(processBase)
                    .then(coverParams)
                    .then($scope.getList);
            } else {
                $scope.getList(coverParams());
            }
        }

        initSearch();

        $scope.$on('$locationChangeSuccess', function () {
            initSearch();
        })

    });