/**
 * Created by Administrator on 2017/4/19 0019.
 */

var app = require('app');
app.registerController('PdfCtrl', PdfCtrl);

/*@ngInject*/
function PdfCtrl(Static) {
  var vm = this;

  vm.pdfUrl = Static.pdfUrl;
}
