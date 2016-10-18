<<<<<<< HEAD
var app = require('../app')

// 调用Api 服务
app.registerController('newsCtrl', ['$scope', 'News', function($scope, News){
  News.query(function(data){
    $scope.news = data;
  });

  $scope.numPages = 8;
  $scope.currentPage = 1;

  // 删除数据
  $scope.remove = function($event, news){
    //..... 确认删除
    //
    
    // 删除请求
    News.remove({id: news.id}, function(data){
      console.log(data);
=======
var app = require('../app');
var $controllerProvider = app.$controllerProvider
    // 调用Api 服务
$controllerProvider.register('newsCtrl',
    /*@ngInject*/
    function($scope, News, $modal, dialogs) {

        //app.registerController('newsCtrl', ['$scope', 'News', '$modal', 'dialogs',  function($scope, News, $modal, dialogs){


        $scope.query = function() {
            return News.query(function(data) {
                $scope.news = data;
                return data;
            });
        };

        $scope.query();

        // 删除数据
        // $scope.remove = function($event, news){
        //   console.log(news)
        //   //..... 确认删除
        //   $modal.open({
        //     controller:['$scope', '$modalInstance', function($scope, $modalInstance){
        //       $scope.ok = function () {
        //         $modalInstance.close();
        //       };

        //       $scope.cancel = function () {
        //         $modalInstance.dismiss('cancel');
        //       };
        //     }],
        //     template: '<div class="row"><header class="col-lg-12">\
        //                   <h3>提示</h3>\
        //                 </header>\
        //                 <div class="col-lg-12 content">\
        //                   <p>确认删除</p>\
        //                 </div>\
        //                 <footer class="col-lg-12">\
        //                   <button class="btn btn-danger" ng-click="ok()">确定</button>\
        //                   <button class="btn btn-primary" ng-click="cancel()">取消</button>\
        //                 </footer></div>',
        //     size: 'sm',
        //   }).result.then(function(){
        //     News.remove({id:news._id.$oid}, function(data){
        //       console.log(data);
        //     });
        //   }, function(){

        //   })
        //   // 删除请求
        // };

        // 删除新闻
        $scope.remove = function($event, news) {
            dialogs.confirm({ template: '<p class="text-center text-default">确认删除？</p>' }).then(function() {
                News.remove({ id: news._id.$oid }, function(data) {
                    $scope.query();
                });
            });
        };
>>>>>>> e9cce57e533dc37f13c91f50d52797fa3e0014c4
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
                        $state.go('news.list')
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
