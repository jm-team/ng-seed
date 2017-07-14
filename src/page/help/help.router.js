var templateUrl = require('./help.html');

module.exports = {
    title: '帮助中心',
    keywords: '666',
    description: 'gaigaigai',
    url: '/help',
    templateUrl: templateUrl,
    controller: 'HelpCtrl',
    resolve: {
        /*@ngInject*/
        loadCtrl: function($q) {
            var defer = $q.defer();
            require.ensure([], function(require) {
                defer.resolve(require('./help.controller.js'));
            }, 'help');
            return defer.promise;
        }
    }
};
