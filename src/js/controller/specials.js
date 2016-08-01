var app = require('app');
app.registerController('SpecialsCtrl', [
  '$scope', 
  'API', 
  '$modal', 
  function($scope, API, $modal) {
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
    $scope.currentPage = 1;

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

    // 数据操作
    angular.extend($scope, {
      onSelect: function(list){
        console.log($scope.search)
        $scope.currentPage = 1;
        $scope.getSpecials();
      },

      sort: function(filed){
        if(prevSortFiled === filed){
          sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        }else{
          sortOrder = 'desc';
        }
        $scope.sortFiled = prevSortFiled = filed;
      },

      // 获取数据列表
      getSpecials: function(){
        var search = {};
        if(prevSortFiled){
          search[filed] = sortFiled || 'desc';
        }
        search['pageSize'] = $scope.pageSize || 10;
        search['currentPage'] = $scope.currentPage || 1;
        angular.extend($scope.search, search);

        API.Special().get($scope.search, function(data){
          $scope.specials = data.result;
          $scope.totalItems = data.totalResult;
          // $scope.totalPage = data.totalPage;
          console.log($scope.totalPage)
        })
      },

      // 发货点击
      sendGoods: function(){

      }
    });
    $scope.getSpecials();

    // 分页插件
    angular.extend($scope, {
      maxSize:5,

      /**
       * [pageChanged 点击页面获取列表 ]
       * @param  {[type]} data [description]
       * @return {[type]}      [description]
       */
      pageChanged: function(){
        console.log($scope.currentPage)
        $scope.getSpecials();
      },

      /**
       * [selectPage 输入框输入页码搜索 ]
       * @param  {[type]} page [description]
       * @return {[type]}      [description]
       */
      selectPage: function(page){
        var page = Number(page);
        if(!isNaN(page) && page > 0){
          if(page <= $scope.totalPage){
            $scope.currentPage = page;
          }
        }
        $scope.getSpecials();
        $scope.page = '';
      }
    })

    $scope.$watch('search.startDate', function(newValue,oldValue){
       $scope.endDateOptions.minDate = newValue;
    });
}]);
