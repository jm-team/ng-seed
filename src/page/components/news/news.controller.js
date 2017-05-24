var app = require('app');

// 调用Api 服务
app.registerController('newsCtrl',
  /*@ngInject*/
  function ($scope, News, dialogs, $timeout) {
    var vm = this;

    vm.indexCrumb = {
      displayName:"首页",
      router:"home"
    };

    vm.query = query;
    vm.removeArticle = removeArticle;

    vm.query();

    function query() {
      return News.query({
        key:'12'
      }, function (data) {
        $scope.news = data;
        return data;
      });
    };


    // 删除新闻
    function removeArticle($event, news) {
      dialogs.confirm({
        template: '<p class="text-center text-default">确认删除？</p>'
      }).then(function () {
        News.remove({
          id: news._id.$oid
        }, function () {
          $scope.query();
        });
      });
    };
  });


app.registerController('newsDetailCtrl',
  /*@ngInject*/
  function ($scope, news, News) {
    $scope.news = news;
  });

app.registerController('newsSaveCtrl',
  /*@ngInject*/
  function ($scope, news, News, $state) {
    $scope.news = news;
    $scope.save = function ($event) {
      $scope.newsForm.submited = true;

      if ($scope.newsForm.$invalid) {
        return;
      } else {
        // PUT 数据
        if ($scope.news._id) {
          News.update({
              id: news._id.$oid
            },
            angular.extend({}, $scope.news, {
              _id: undefined
            }),
            function (data) {
              $state.go('news.list');
            });
          // POST 数据
        } else {
          News.save({},
            angular.extend({}, $scope.news),
            function (data) {
              $state.go('news.list');
            });
        }
      }
    };
  });
