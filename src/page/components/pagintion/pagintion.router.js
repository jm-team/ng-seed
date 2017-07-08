var templateUrl = require('./pagintion.html');

window.hljs = require('highlight.js');
window.marked = require('marked');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

module.exports = {
  url: '^/pagintion',
  // abstract: true,
  templateUrl: templateUrl,
  controller: 'PagintionCtrl',
  controllerAs: 'vm',
  data: {
    breadcrumbProxy: 'components.pagintion',
    displayName: '分页'
  },
  resolve: {
    /*@ngInject*/
    mk: function($q) {
      return $q.when(marked(require('./index.md')));
    },
    /*@ngInject*/
    loadCtrl: function($q) {
      var defer = $q.defer();
      require.ensure([], function(require) {
        defer.resolve(require('./pagintion.controller.js'));
      }, 'pagintion');
      return defer.promise;
    }
  }
};
