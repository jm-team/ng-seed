var templateUrl = require('page/help/help.html');

module.exports = {
    title: '帮助中心',
    url: '/help',
    templateUrl: templateUrl,
    controller: 'HelpCtrl',
    resolve: {
        /*@ngInject*/
        loadCtrl: function ($q) {
            var defer = $q.defer();
            require.ensure([], function (require) {
                defer.resolve(require('./helpCtrl.js'));
            }, 'help');
            return defer.promise;
        }
    }
};