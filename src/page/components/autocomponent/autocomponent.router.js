var templateUrl = require('./autocomponent.html');

module.exports = {
    title: '自动完成',
    url: '^/autoComponent',
    templateUrl: templateUrl,
    controller: 'AutoComponentCtrl',
    controllerAs: "vm",
    data: {
        breadcrumbProxy: 'components.autoComponent',
        displayName: '自动完成'
    },
    resolve: {
        /*@ngInject*/
        loadCtrl: function ($q, $timeout) {
            var defer = $q.defer();
            require.ensure([], function (require) {
                defer.resolve(require('./autocomponent.controller.js'));
            }, 'autocomponent');
            return defer.promise;
        }
    }
};
