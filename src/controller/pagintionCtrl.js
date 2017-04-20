var app = require('app');

app.registerController('PagintionCtrl', PagintionCtrl);

function PagintionCtrl() {
  var vm = this;

  vm.numPages = 5;
  vm.currentPage = 1;

  vm.numPages2 = 20;
  vm.currentPage2 = 8;
}
