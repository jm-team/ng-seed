var app = require('app');
/**
 * [ 运费特惠控制器 ]
 * @param  {[type]} $scope   [ 当前作用域 ]
 * @param  {[type]} specials [ 运费特惠数据列表 ]
 * @param  {[type]} $modal   [ 弹出层服务 ]
 * @return {[type]}          [description]
 */
app.registerController('SpecialsCtrl', [
  '$scope', 
  'specials', 
  '$modal', 
  function($scope, specials, $modal) {
    var s1 = [{
      name:'回程车',
      value:0
    },{
      name:'线路折扣',
      value:1
    }];

    var prevSortFiled = '';
    var sortOrder = '';

    var s2 = [{
      name:'不限',
      value:0
    },{
      name:'集装箱',
      value:1
    },{
      name:'散装',
      value:2
    },{
      name:'专用箱',
      value:3
    }];

    var s3 = [{
      name:'境外',
      value:0
    },{
      name:'境内',
      value:1
    }];


    $scope.search = {
      prefType: 0,
      loadType: 2,
      area:1,
      startDate:'',
      endDate:''
    };

    $scope.prefTypes = s1;
    $scope.loadTypes = s2;
    $scope.areas = s3;

    $scope.specials = specials.dataList;

    // 数据操作
    angular.extend($scope, {
      onSelect: function(list){
        console.log($scope.search)
      },

      sort: function(filed){
        
        if(prevSortFiled === filed){
          sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        }else{
          sortOrder = 'desc';
        }
        $scope.sortFiled = prevSortFiled = filed;
        console.log(sortOrder)
      },


      // 发货点击
      sendGoods: function(){

      }
    });



    // 分页插件
    angular.extend($scope, {
      maxSize:5,
      numPages:12,
      currentPage:2,
      totalItems : 147,
      pageChanged: function(){
        console.log($scope.currentPage)
      },
      selectPage: function(page){
        var page = Number(page);
        if(!isNaN(page) && page > 0){
          if(page <= $scope.numPages){
            $scope.currentPage = page;
          }
        }
        $scope.page = '';
      }
    })



    // 时间控件
    angular.extend($scope, {
      startDateOptions: {
        showWeeks: false,
        formatYear: 'yyyy',
        startingDay: 1
      },
      endDateOptions: {
        showWeeks: false,
        formatYear: 'yyyy',
        startingDay: 1
      },
      open1: function(){
        $scope.opened1 = true;
      },
      open2:function(){
        $scope.opened2 = true;
      }
    });
    $scope.$watch('search.startDate', function(newValue,oldValue){
       $scope.endDateOptions.minDate = newValue;
    });
}]);