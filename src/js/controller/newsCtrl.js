var app = require('../app')

// 调用Api 服务
app.registerController('newsCtrl', ['$scope', 'News', function($scope, News){
  News.query(function(data){
    $scope.news = data;
  });

  // 删除数据
  $scope.remove = function($event, news){
    //..... 确认删除
    //
    
    // 删除请求
    News.remove({id: news.id}, function(data){
      console.log(data);
    });
  };
}]);


app.registerController('newsDetailCtrl', ['$scope', 'news', 'News', function($scope, news, News){
  $scope.news = news;
}]);

app.registerController('newsSaveCtrl', ['$scope', 'news', 'News', function($scope, news, News){
  $scope.news = news;

  $scope.save = function($event){
    $scope.newsForm.submited = true;

    if($scope.newsForm.$invalid){
      return ;
    }else{
      // POST 数据
      News.save({}, $scope.news, function(data){
        console.log(data);
      });
    }
  };
}]);
