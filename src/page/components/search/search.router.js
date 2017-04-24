var templateUrl = require('./search.html');

module.exports = {
    title: '数据搜索',
    url: '^/search',
    reloadOnSearch: false,
    templateUrl: templateUrl,
    controller: 'SearchCtrl',
    data: {
        breadcrumbProxy: 'components.search',
        displayName: '搜索列表'
    },
    resolve: {
        /*@ngInject*/
        loadCtrl: function ($q) {
            var defer = $q.defer();
            require.ensure([], function (require) {
                defer.resolve(require('./search.controller.js'));
            }, 'home');
            return defer.promise;
        }
        // },
        // onEnter: function(){
        //     console.log('onEnter')
        // },
        // onExit: function($stateParams){
        //     $stateParams.abc()
        //     console.log('onExit')
    }
}
