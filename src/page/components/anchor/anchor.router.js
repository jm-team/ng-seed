var templateUrl = require('./anchor.html');

module.exports = {
    title: '锚点跳转',
    url: '^/anchor',
    templateUrl: templateUrl,
    controller: 'AnchorCtrl',
    controllerAs: "vm",
    data: {
        breadcrumbProxy: 'components.anchor',
        displayName: '锚点跳转'
    },
    resolve: {
        /*@ngInject*/
        loadCtrl: function ($q, $timeout) {
            var defer = $q.defer();
            require.ensure([], function (require) {
                defer.resolve(require('./anchor.controller.js'));
            }, 'anchor');
            return defer.promise;
        }
    }
};
