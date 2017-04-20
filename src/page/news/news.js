var templateUrl = require('page/news/news.html');

module.exports = {
    abstract: true,
    title: '新闻列表页',
    // url: '^/news',
    templateUrl: templateUrl,
    data: {
        breadcrumbProxy: 'news.list',
        displayName: '新闻列表页'
    },
    resolve: {
        /*@ngInject*/
        loadCtrl: function ($q) {
            var defer = $q.defer();
            require.ensure([], function (require) {
                defer.resolve(require('./newsCtrl.js'));
            }, 'news');
            return defer.promise;
        }
    }
};