var templateUrl = require('./tooltip.html');
require("./tooltip.tpl.html");
require("./tooltip.tpl2.html");

module.exports = {
    url: '^/tooltip',
    // abstract: true,
    templateUrl: templateUrl,
    controller: 'TooltipCtrl',
    controllerAs: 'vm',
    data: {
        breadcrumbProxy: 'components.tooltip',
        displayName: '提示框'
    },
    resolve: {
        /*@ngInject*/
        loadCtrl: function ($q) {
            var defer = $q.defer();
            require.ensure([], function (require) {
                defer.resolve(require('./tooltip.controller.js'));
            }, 'tooltip');
            return defer.promise;
        }
    }
};
