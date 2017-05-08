var templateUrl = require('./autocomplete.html');
require('./custTpl.html');

module.exports = {
    title: '自动完成',
    url: '^/autoComplete',
    templateUrl: templateUrl,
    controller: 'AutoCompleteCtrl',
    controllerAs: "vm",
    data: {
        breadcrumbProxy: 'components.autoComplete',
        displayName: '自动完成'
    },
    resolve: {
        /*@ngInject*/
        loadCtrl: function ($q, $timeout) {
            var defer = $q.defer();
            require.ensure([], function (require) {
                defer.resolve(require('./autocomplete.controller.js'));
            }, 'autocomplete');
            return defer.promise;
        }
    }
};
