/**
 * Created by Administrator on 2017/4/19 0019.
 */

var templateUrl = require('./tab.html');

module.exports = {
    url: '^/tab',
    // abstract: true,
    templateUrl: templateUrl,
    controller: 'TabCtrl',
    controllerAs: 'vm',
    data: {
        breadcrumbProxy: 'components.tab',
        displayName: 'tab 选项卡'
    },
    resolve: {
        /*@ngInject*/
        loadCtrl: function ($q) {
            var defer = $q.defer();
            require.ensure([], function (require) {
                defer.resolve(require('./tab.controller.js'));
            }, 'tab');
            return defer.promise;
        }
    }
};

