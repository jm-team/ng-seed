var templateUrl = require('page/news/news.detail.html');

module.exports = {
    url: '/:id',
    templateUrl: templateUrl,
    controller: 'newsDetailCtrl',
    data: {
        displayName: '{{news.title}}'
    },
    resolve: {
        /*@ngInject*/
        news: function ($stateParams, News, $q) {
            var defer = $q.defer();
            // 从服务端获取数据
            News.get({id: $stateParams.id}, function (data) {
                defer.resolve(data);
            });
            return defer.promise;
        }
    }
};