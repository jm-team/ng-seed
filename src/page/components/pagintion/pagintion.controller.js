var app = require('app');
app.registerController('PagintionCtrl', PagintionCtrl);
/*@ngInject*/
function PagintionCtrl(mk) {
  var vm = this;
  vm.mk = mk;
  vm.numPages = 5;
  vm.currentPage = 1;

  vm.numPages2 = 20;
  vm.currentPage2 = 8;

  hljs.initHighlightingOnLoad();
}
