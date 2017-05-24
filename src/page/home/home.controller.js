var app = require('app');

// `Home` 控制器
app.registerController('HomeCtrl', HomeCtrl);

///////////////////////////

/*@ngInject*/
function HomeCtrl($scope, Api, $state) {
  var vm = $scope;


  $scope.myInterval = 5000;

  var slides = $scope.slides = [];
  var images = ['http://img.jumore.com/group2/M00/00/04/ClgMDFkVbhiADr-NAAlRA9Jack0148_reduce.jpg',
  'http://file.uploadapi.jumore.com/newupload/jumoreyun.com/PC/2017/01/21/18/13/09/1871fd1465f3b8d2-jm.png',
  'http://img.jumore.com/newupload/jumoretong.com/PC/2017/02/28/16/51/16/52e84dbe514e1227-jm.jpg',
  'http://file.uploadapi.jumore.com/newupload/jumoreyun.com/PC/2017/01/21/18/12/58/fad2918740ac138e-jm.jpg']
  $scope.addSlide = function() {
    slides.push({
      image: images[i],
      text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
      ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
    });
  };
  for (var i=0; i<4; i++) {
    $scope.addSlide(i);
  }


  $scope.start = false;

  $scope.startFn = function(){
    $scope.start = true;
  };

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
