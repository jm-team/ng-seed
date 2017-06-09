var templateUrl = require('./{{tpl}}.html');

module.exports = {
    title: "{{tpl}}",
    url: '/{{tpl}}',
    templateUrl: templateUrl,
    name: '{{tpl}}',
    controller: '__Tpl__Ctrl',
    controllerAs:'vm',
    data: {
        breadcrumbProxy: '/* TODO: state.name */',
        displayName: '{{tpl}}'
    },
    resolve: {
        /*@ngInject*/
        loadCtrl: function ($q) {
            var defer = $q.defer();
            require.ensure([], function (require) {
                defer.resolve(require('./{{tpl}}.controller.js'));
            }, '{{tpl}}');
            return defer.promise;
        }
    }
};
