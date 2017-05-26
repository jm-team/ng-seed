/**
 * Created by Administrator on 2017/4/19 0019.
 */
document.createElement('treecontrol');
document.createElement('treeitem');
var templateUrl = require('./tree.html');
require('./tree.scss');

module.exports = {
    url: '^/tree',
    // abstract: true,
    templateUrl: templateUrl,
    controller: 'TreeCtrl',
    controllerAs: 'vm',
    data: {
        breadcrumbProxy: 'components.tree',
        displayName: 'tree 树结构'
    },
    resolve: {
        /*@ngInject*/
        loadCtrl: function ($q) {
            var defer = $q.defer();
            require.ensure([], function (require) {
                defer.resolve(require('./tree.controller.js'));
            }, 'tree');
            return defer.promise;
        }
    }
};

