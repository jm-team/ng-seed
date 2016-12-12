var templateUrl = require('page/chart/chart.html');

module.exports = {
    title: '云詞',
    url: '/chart',
    templateUrl: templateUrl,
    controller: 'ChartCtrl',
    resolve: {
        loadCtrl: function ($q) {
            var defer = $q.defer();
            require.ensure([], function (require) {
                defer.resolve(require('controller/chartCtrl.js'));
            }, 'chart');
            return defer.promise;
        }
    }
};