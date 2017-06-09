var app = require('app');

app.registerController('ImgErrorCtrl', ImgErrorCtrl);

/*@ngInject*/
function ImgErrorCtrl(Static) {

  var vm = this;

  vm.jpg = "1.jpg"
  vm.defaultImage = Static.defaultImage; //.require("../../../asset/img/logo.png");

}
