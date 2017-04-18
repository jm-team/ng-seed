var app = require('app');

// `Home` 控制器
app.registerController('HomeCtrl', HomeCtrl);

///////////////////////////

/*@ngInject*/
function HomeCtrl(Api, $modal, $state) {
  var vm = this;

  vm.title = "Home Page";
  vm.desc = "这是主页";
  vm.data = [1, 2, 3, 4, 5];
  vm.collection = [];
  vm.searchText = 1;
  vm.changeImageUrl = changeImageUrl;
  vm.changeImage = changeImage;

  vm.changeImage();

  ///////////////////////////////////

  // lazy img
  function changeImageUrl() {
    return '//placehold.it/768x599/' + Math.floor(Math.random() * 16777215).toString(16) + '/ffffff';
  }

  /* build random item list */
  for (var i = 0; i < 20; i++) {
    vm.collection.push({
      type: Math.floor(Math.random() * 2) + 1,
      number: i + 1,
      srcset: changeImageUrl()
    });
  }

  function changeImage() {
    vm.runtimeImageSrc = changeImageUrl();
  }

}
