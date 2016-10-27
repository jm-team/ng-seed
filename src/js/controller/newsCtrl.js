
var app = require('../app');
var $controllerProvider = app.$controllerProvider;
    // 调用Api 服务
$controllerProvider.register('newsCtrl',
    /*@ngInject*/
    function($scope, News, $modal, dialogs) {
        console.log(News);
        $scope.currentPage = 6;
        $scope.query = function() {
            return News.query({pageSize:1},function(data) {
                $scope.news = data;
                return data;
            });
        };

        $scope.query();

        // 删除新闻
        $scope.remove = function($event, news) {
            dialogs.confirm({ template: '<p class="text-center text-default">确认删除？</p>' }).then(function() {
                News.remove({ id: news._id.$oid }, function(data) {
                    $scope.query();
                });
            });
        };
    });


app.registerController('newsDetailCtrl',
  /*@ngInject*/
  function($scope, news, News) {
    $scope.news = news;
});

app.registerController('newsSaveCtrl', 
  /*@ngInject*/
  function($scope, news, News, $state) {
    $scope.news = news;
    $scope.save = function($event) {
        $scope.newsForm.submited = true;

        if ($scope.newsForm.$invalid) {
            return;
        } else {
            // PUT 数据
            if ($scope.news._id) {
                News.update({ id: news._id.$oid },
                    angular.extend({}, $scope.news, { _id: undefined }),
                    function(data) {
                        $state.go('news.list');
                    });
                // POST 数据
            } else {
                News.save({},
                    angular.extend({}, $scope.news),
                    function(data) {
                        $state.go('news.list');
                    });
            }
        }
    };
});
