var templateUrl = require('./pdf.html');

module.exports = {
    url: '^/pdf',
    templateUrl: templateUrl,
    controller: 'PdfCtrl',
    controllerAs: 'vm',
    data: {
        breadcrumbProxy: 'components.pdf',
        displayName: 'pdf'
    },
    resolve: {
        /*@ngInject*/
        loadCtrl: function ($q) {
            var defer = $q.defer();
            require.ensure([], function (require) {
              
                defer.resolve(require('./pdf.controller.js'));
            }, 'pdf');
            return defer.promise;
        }
    }
};
