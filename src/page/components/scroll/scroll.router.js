var templateUrl = require('./scroll.html');

module.exports = {
  title: '数据展示',
  url: '^/scroll',
  templateUrl: templateUrl,
  data: {
    breadcrumbProxy: 'components.scroll',
    displayName: '数据展示'
  },
  controller: ['$scope', 'Api', function($scope, Api) {

    $scope.finishRender = false;
    $scope.scrollable = false;

    Api.GridDataList().get().$promise.then(function successCallback(response) {
      var data = response.data;

      // 内容高度大于容器高度的时候，将滚动显示
      // 根据容器高度设置相应的值
      $scope.scrollable = data.dataList.length > 10;

      var dataList = data.dataList;
      if ($scope.scrollable) {
        // 拷贝一份用于滚动
        dataList = dataList.concat(dataList);
        data.dataList = dataList;
      }

      $scope.data = data;

    }, function errorCallback(response) {

    });

    /**
     * ng-repeat数据绑定结束
     */
    $scope.$on('rendered', function(scope, element, attrs) {
      $scope.finishRender = true;
    });
  }]
};
