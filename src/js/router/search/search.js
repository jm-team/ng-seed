var templateUrl = require('page/search/search.html');

module.exports = {
    title: '数据搜索',
    url: '/search?categoryId&industryId&',
    // url: '/search',
    // params:{
    //     categoryId:null,
    //     industryId:null
    // },
    reloadOnSearch: false,
    templateUrl: templateUrl,
    controller: 'SearchCtrl',
    resolve: {
        /*@ngInject*/
        loadCtrl: function ($q) {
            var defer = $q.defer();
            require.ensure([], function (require) {
                defer.resolve(require('controller/searchCtrl.js'));
            }, 'home');
            return defer.promise;
        }
    }
}
