var templateUrl = require('page/about/about.html');
require("page/about/tooltip.html");
module.exports = {
    title: "关于我们",
    url: '/about',
    templateUrl: templateUrl,
    name: '关于我们',
    controller: 'AboutCtrl',
    resolve: {
        /*@ngInject*/
        loadCtrl: function ($q) {
            var defer = $q.defer();
            require.ensure([], function (require) {
                defer.resolve(require('controller/aboutCtrl.js'));
            }, 'about');
            return defer.promise;
        }
    }
};