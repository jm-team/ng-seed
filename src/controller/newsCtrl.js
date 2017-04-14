var app = require('app');

// 调用Api 服务
app.registerController('newsCtrl',
  /*@ngInject*/
  function ($scope, News, $modal, dialogs, $timeout, $http) {
    $scope.currentPage = 7;
    $scope.numPages = 9;
    $scope.maxSize = 3;
    $scope.itemsPerPage = 6;
    $scope.query = function () {
      return News.query({
        pageSize: 1
      }, function (data) {
        $scope.news = data;
        return data;
      });
    };

    $scope.query();

    // 删除新闻
    $scope.remove = function ($event, news) {
      dialogs.confirm({
        template: '<p class="text-center text-default">确认删除？</p>'
      }).then(function () {
        News.remove({
          id: news._id.$oid
        }, function (data) {
          $scope.query();
        });
      });
    };

    $scope.selectPage = function (page) {
      console.log(page);
    };


    $scope.select = function (arg) {
      var tab = arg.tab;
    };

    // tab2
    //
    $timeout(function () {
      $scope.tabs = [
        {
          title: "Home",
          content: 'ring be appetite it declared. High eyes kept so busy feel call in. Would day nor ask walls known. But preserved advantage are but and certainty earnestly enjoyment. Passage weather as up am exposed. And natural related man subject. Eagerness get situation his was delighted. '
                },
        {
          title: "Profile",
          selected: true,
          content: 'Fulfilled direction use continual set him propriety continued. Saw met applauded favourite deficient engrossed concealed and her. Concluded boy perpetual old supposing. Farther related bed and passage comfort civilly. Dashwoods see frankness objection abilities the. As hastened oh produced prospect formerly up am. Placing forming nay looking old married few has. Margaret disposed add screened rendered six say his striking confined. '
                },
        {
          title: "Message",
          content: 'When be draw drew ye. Defective in do recommend suffering. House it seven in spoil tiled court. Sister others marked fat missed did out use. Alteration possession dispatched collecting instrument travelling he or on. Snug give made at spot or late that mr. '
                },
        {
          title: "Setting",
          content: 'Luckily friends do ashamed to do suppose. Tried meant mr smile so. Exquisite behaviour as to middleton perfectly. Chicken no wishing waiting am. Say concerns dwelling graceful six humoured. Whether mr up savings talking an. Active mutual nor father mother exeter change six did all. '
                }
            ];

      $scope.accordions = [{
        title: "手风琴标题1",
        content: "手风琴内容1"
            }, {
        title: "手风琴标题2",
        content: "手风琴内容2"
            }, {
        title: "手风琴标题3",
        content: "手风琴内容3"
            }];
    }, 10)




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
