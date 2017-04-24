/**
 * Created by Administrator on 2017/4/19 0019.
 */

var templateUrl = require('./alert.html');
module.exports = {
    url: '^/alert',
    // abstract: true,
    templateUrl: templateUrl,
    controller: 'AlertCtrl',
    controllerAs: 'vm',
    data: {
        breadcrumbProxy: 'components.alert',
        displayName: '提示'
    },
    resolve: {
        /*@ngInject*/
        loadCtrl: function ($q) {
            var defer = $q.defer();
            require.ensure([], function (require) {
                defer.resolve(require('./alert.controller.js'));
            }, 'alert');
            return defer.promise;
        }
    }
};

