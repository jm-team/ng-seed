/**
 * Created by Administrator on 2017/4/19 0019.
 */

var templateUrl = require('./transfer.html');

module.exports = {
    url: '^/transfer',
    // abstract: true,
    templateUrl: templateUrl,
    controller: 'TransferCtrl',
    controllerAs: 'vm',
    data: {
        breadcrumbProxy: 'components.transfer',
        displayName: 'transfer 穿梭框'
    },
    resolve: {
        /*@ngInject*/
        loadCtrl: function ($q) {
            var defer = $q.defer();
            require.ensure([], function (require) {
                defer.resolve(require('./transfer.controller.js'));
            }, 'tab');
            return defer.promise;
        }
    }
};

