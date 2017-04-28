var app = require('app');

// 调用Api 服务
app.registerController('SearchCtrl',
    /*@ngInject*/
    function ($scope, $http, $q, $stateParams, $state, $timeout, $location, jmSearch, Api) {
        var defaultSearch = {
            categoryId: 0,
            industryId: 0
        };

        angular.extend($scope, {
            // 初始化参数
            search: angular.extend({}, defaultSearch, $location.search()),
            // 基础数据
            base: {
                categorys: [],
                industrys: []
            },

            changeType: function (list, type) {
                $scope.search[type] = list[type];
                $location.search($scope.search);
            },

            getList: function (data) {
                // 分类列表
                Api.Search().query(data).$promise.then(function (result) {
                    $scope.searchLists = result;
                }, function () {
                    alert('Error');
                }).then(filterJsonData);

            }
        });

        initSearch();

        jmSearch($scope, initSearch);

        // 筛选条件
        function filterJsonData() {
            $scope.lists = [];
            angular.forEach($scope.searchLists, function (item) {
                if($scope.search['categoryId']){ // 判断分类是否为空
                    if(item.categoryId == $scope.search['categoryId']){
                        if(item.industryIds.match($scope.search['industryId'])){
                            $scope.lists.push(item);
                        }
                    }
                }else{
                    if(+$scope.search['industryId']) { // 判断行业是否为空
                        if (item.industryIds.match($scope.search['industryId'])) {
                            $scope.lists.push(item);
                        }
                    }else{
                        $scope.lists = $scope.searchLists;
                    }
                }
            })
        }


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
            $scope.base.categorys = data[0];
            $scope.base.industrys = data[1];
            return $scope.base;
        }

        // 将地址栏上的数据覆盖到搜索条件
        function coverParams() {
            $scope.search = angular.extend({}, defaultSearch, $location.search());
            return $scope.search;
        }

        function initSearch() {
            if (!$scope.base.categorys.length && !$scope.base.industrys.length) {
                $q.all([Api.Category().query().$promise, Api.Industry().query().$promise])
                    .then(processBase)
                    .then(coverParams)
                    .then($scope.getList);
            } else {
                $scope.getList(coverParams());
            }
        }

    });