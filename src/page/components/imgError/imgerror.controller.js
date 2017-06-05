var app = require('app');

app.registerController('ImgErrorCtrl', ImgErrorCtrl);

/*@ngInject*/
function ImgErrorCtrl() {

  var vm = this;

  vm.jpg = "1.jpg"
  vm.defaultImage = require("../../../asset/img/logo.png");
 
}

